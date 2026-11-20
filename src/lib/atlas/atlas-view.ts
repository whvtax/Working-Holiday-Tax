// Atlas command centre: turns the morning report into what the page shows.
// Pure: no store, no network, no clock. Anything without a real source is
// returned as `null` so the UI says "Not connected yet" instead of a number.
import type { MorningReport } from '@/lib/will/morning-report';
import { svtLineEnabled } from '@/lib/will/brand-context';

export interface AtlasTile {
  key: string;
  label: string;
  value: number | null;
  sub: string;
  attention: boolean;
}

export interface AtlasModule {
  key: 'crm' | 'will' | 'accounts' | 'mia' | 'social_wht' | 'social_svt';
  name: string;
  line: string;
  connected: boolean;
  attention: boolean;
  /** Where the module leads. null when that screen is not built yet. */
  href: string | null;
}

/** One line in a module's floating panel. */
export interface PanelItem {
  id: string;
  title: string;
  detail: string;
}

/** An open task, slimmed for the page. No contact details, no suggested replies. */
export interface OpenTaskItem {
  id: string;
  customerName: string | null;
  reason: string;
  severity: string;
  createdAt: string;
}

export interface AtlasView {
  tiles: AtlasTile[];
  modules: AtlasModule[];
  /** Empty when everything is fine. Each entry is shown after "Attention:". */
  reasons: string[];
  /** What each connected module's panel lists. Unbuilt modules have none. */
  panels: { crm: PanelItem[]; will: PanelItem[] };
}

function hoursText(h: number): string {
  return h === 1 ? '1 hour' : `${h} hours`;
}

export function atlasView(r: MorningReport, openTasks: OpenTaskItem[] = [], byBrand?: { wht: MorningReport; svt: MorningReport }): AtlasView {
  // Will's and Mia's lines show their own customers; the tiles are both brands.
  const willR = byBrand?.wht ?? r;
  const miaR = byBrand?.svt;
  const waiting = r.waitingOnUs.length;
  const stuck = r.stuckAfterPayment.length;
  const blocked = r.blocked;

  const reasons: string[] = [];
  if (waiting > 0) reasons.push(`${waiting} ${waiting === 1 ? 'customer is' : 'customers are'} waiting over an hour`);
  if (stuck > 0) reasons.push(`${stuck} paid ${stuck === 1 ? 'customer is' : 'customers are'} stuck after payment`);
  if (blocked > 0) reasons.push(`${blocked} ${blocked === 1 ? 'task is' : 'tasks are'} blocked`);

  const tiles: AtlasTile[] = [
    {
      key: 'needs-you',
      label: 'Needs you',
      value: waiting + stuck + blocked,
      sub: 'Waiting, stuck after payment, or blocked',
      attention: waiting + stuck + blocked > 0,
    },
    {
      key: 'paid',
      label: 'Paid',
      value: r.paid,
      sub: 'Amount not connected yet',
      attention: false,
    },
    {
      key: 'bank',
      label: 'Bank lines unmatched',
      value: null,
      sub: 'Not connected yet',
      attention: false,
    },
    {
      key: 'handled',
      label: 'Handled by Will and Mia',
      value: r.handledByWill,
      sub: `${r.handledByTeam} needed the team`,
      attention: false,
    },
    {
      key: 'leads',
      label: 'New leads',
      value: r.newLeads,
      sub: `${r.openTasks} open ${r.openTasks === 1 ? 'task' : 'tasks'}`,
      attention: false,
    },
    {
      key: 'ato',
      label: 'Next ATO due date',
      value: null,
      sub: 'Not connected yet',
      attention: false,
    },
  ];

  const modules: AtlasModule[] = [
    // Mia has her own WhatsApp line (Jo, 20 Nov): connected once SVT_WHATSAPP_PHONE_NUMBER_ID is set.
    { key: 'mia', name: 'Mia (SVT)', line: svtLineEnabled() ? (miaR ? `${miaR.handledByWill} handled, 24 hours` : 'Student line live') : 'Not connected yet', connected: svtLineEnabled(), attention: false, href: '/mia' },
    { key: 'will', name: 'Will (WHT)', line: `${willR.handledByWill} handled, 24 hours`, connected: true, attention: false, href: '/will' },
    { key: 'accounts', name: 'Accounting', line: 'Not connected yet', connected: false, attention: false, href: '/atlas/accounts' },
    { key: 'crm', name: 'CRM', line: `${waiting} waiting for reply`, connected: true, attention: waiting > 0, href: '/crm' },
    { key: 'social_wht', name: 'Social Media (WHT)', line: 'Not connected yet', connected: false, attention: false, href: '/atlas/social_wht' },
    { key: 'social_svt', name: 'Social Media (SVT)', line: 'Ella: videos, posts and promotion', connected: true, attention: false, href: '/atlas/social_svt' },
  ];

  const crmPanel: PanelItem[] = [
    ...r.waitingOnUs.map((p) => ({
      id: `wait-${p.id}`,
      title: `${p.name} is waiting for a reply`,
      detail: `Waiting ${hoursText(p.hours)}${p.preview ? ` · last: ${p.preview}` : ''}`,
    })),
    ...r.stuckAfterPayment.map((p) => ({
      id: `stuck-${p.id}`,
      title: `${p.name} is stuck after payment`,
      detail: `No movement for ${hoursText(p.hours)}`,
    })),
  ];

  const willPanel: PanelItem[] = openTasks.map((t) => ({
    id: `task-${t.id}`,
    title: t.customerName ?? 'Unknown customer',
    detail: `${t.reason} · ${t.severity.toLowerCase()}`,
  }));

  return { tiles, modules, reasons, panels: { crm: crmPanel, will: willPanel } };
}
