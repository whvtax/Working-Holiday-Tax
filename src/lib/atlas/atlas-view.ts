// Atlas command centre: turns the morning report into what the page shows.
// Pure: no store, no network, no clock. Anything without a real source is
// returned as `null` so the UI says "Not connected yet" instead of a number.
import type { MorningReport } from '@/lib/will/morning-report';

export interface AtlasTile {
  key: string;
  label: string;
  value: number | null;
  sub: string;
  attention: boolean;
}

export interface AtlasModule {
  key: 'crm' | 'will' | 'accounts' | 'mia' | 'instagram' | 'tiktok';
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

export function atlasView(r: MorningReport, openTasks: OpenTaskItem[] = []): AtlasView {
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
      label: 'Paid, last 24 hours',
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
      label: 'Handled by Will, 24 hours',
      value: r.handledByWill,
      sub: `${r.handledByTeam} needed the team`,
      attention: false,
    },
    {
      key: 'leads',
      label: 'New leads, 24 hours',
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
    { key: 'crm', name: 'CRM', line: `${waiting} waiting for reply`, connected: true, attention: waiting > 0, href: '/crm/dashboard' },
    { key: 'will', name: 'Will', line: `${r.handledByWill} handled, 24 hours`, connected: true, attention: false, href: '/crm/whatsapp' },
    { key: 'accounts', name: 'Accounts', line: 'Not connected yet', connected: false, attention: false, href: '/atlas/accounts' },
    { key: 'mia', name: 'Mia (SVT)', line: 'Not connected yet', connected: false, attention: false, href: '/atlas/mia' },
    { key: 'instagram', name: 'Instagram', line: 'Not connected yet', connected: false, attention: false, href: '/atlas/instagram' },
    { key: 'tiktok', name: 'TikTok', line: 'Not connected yet', connected: false, attention: false, href: '/atlas/tiktok' },
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
