'use client';
// The morning report on the Overview (Jo, 22 Oct), in place of the "Ask Will"
// bot. Read-only: one look at how the last 24 hours went.
import { useCallback, useEffect, useState } from 'react';
import { STATE_LABELS, type CustomerState } from '@/lib/will/state-machine';
import type { MorningReport as Report, ReportPerson } from '@/lib/will/morning-report';

const tile: React.CSSProperties = { background: '#fff', border: '1px solid #e6ece9', borderRadius: 14, padding: '12px 14px', minWidth: 0 };
const num: React.CSSProperties = { fontSize: 24, fontWeight: 800, color: '#0B2E24', lineHeight: 1.1 };
const lab: React.CSSProperties = { fontSize: 12, color: '#587066', marginTop: 4 };
const head: React.CSSProperties = { fontSize: 13, fontWeight: 800, color: '#0B2E24', margin: '0 0 8px' };

function ago(h: number): string {
  if (h < 1) return 'under an hour';
  if (h < 48) return `${h}h`;
  return `${Math.round(h / 24)} days`;
}

function People({ title, empty, people, onOpenChat, tone }: { title: string; empty: string; people: ReportPerson[]; onOpenChat: (id: string) => void; tone: string }) {
  return (
    <div style={{ ...tile, flex: 1, minWidth: 260 }}>
      <p style={head}>{title} <span style={{ color: tone }}>{people.length ? `(${people.length})` : ''}</span></p>
      {people.length === 0 ? <div style={{ fontSize: 13, color: '#7a8c85' }}>{empty}</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {people.map((p) => (
            <button key={p.id} onClick={() => onOpenChat(p.id)} title="Open the chat"
              style={{ textAlign: 'left', background: '#f7faf9', border: '1px solid #e6ece9', borderRadius: 10, padding: '8px 10px', cursor: 'pointer', display: 'block', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}>
                <b style={{ color: '#0B2E24', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</b>
                <span style={{ color: tone, whiteSpace: 'nowrap', fontWeight: 700 }}>{ago(p.hours)}</span>
              </div>
              <div style={{ fontSize: 12, color: '#587066', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {STATE_LABELS[p.stage as CustomerState] ?? p.stage}{p.preview ? ` · ${p.preview}` : ''}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MorningReport({ onOpenChat }: { onOpenChat: (id: string) => void }) {
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true); setError('');
    try {
      const res = await fetch('/api/will/morning', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'failed');
      setReport(data.report as Report);
    } catch {
      setError('Could not load the report. Try again in a moment.');
    } finally { setBusy(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflow: 'auto', paddingBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#0B2E24' }}>Last 24 hours</div>
        <button className="btn" onClick={load} disabled={busy}>{busy ? 'Loading…' : 'Refresh'}</button>
      </div>
      {error && <div style={{ ...tile, color: '#b42318' }}>{error}</div>}
      {report && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
            <div style={tile}><div style={num}>{report.handledByWill}</div><div style={lab}>Handled by Will alone</div></div>
            <div style={tile}><div style={num}>{report.tasksOpened}</div><div style={lab}>Tasks opened ({report.openTasks} open now)</div></div>
            <div style={tile}><div style={num}>{report.handledByTeam}</div><div style={lab}>Chats you replied in</div></div>
            <div style={tile}><div style={num}>{report.newLeads}</div><div style={lab}>New leads</div></div>
            <div style={tile}><div style={num}>{report.paid}</div><div style={lab}>Paid</div></div>
            <div style={tile}><div style={num}>{report.lodged}</div><div style={lab}>Lodged</div></div>
            <div style={tile}><div style={{ ...num, color: report.blocked ? '#b42318' : '#0B2E24' }}>{report.blocked}</div><div style={lab}>Messages blocked by a rule</div></div>
          </div>
          <div style={tile}>
            <p style={head}>Win-backs</p>
            <div style={{ fontSize: 13, color: '#0B2E24', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <span><b>{report.winback.sent}</b> sent</span>
              <span><b>{report.winback.replied}</b> replied (back to Lead)</span>
              <span style={{ color: report.winback.toFinal ? '#b42318' : undefined }}><b>{report.winback.toFinal}</b> moved to Final</span>
            </div>
            <div style={{ fontSize: 12, color: '#587066', marginTop: 6 }}>
              {report.winback.waitingReply} waiting for a reply · {report.winback.queued} ready to send · {report.winback.wonBackPaid} won back and paid
            </div>
          </div>
          <div style={{ ...tile, borderColor: report.security.newDevices.length || report.security.lockouts ? '#f3b3ad' : '#e6ece9' }}>
            <p style={head}>CRM logins</p>
            <div style={{ fontSize: 13, color: '#0B2E24', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <span><b>{report.security.logins}</b> logins</span>
              <span style={{ color: report.security.failed ? '#b54708' : undefined }}><b>{report.security.failed}</b> failed attempts</span>
              <span style={{ color: report.security.lockouts ? '#b42318' : undefined }}><b>{report.security.lockouts}</b> lockouts</span>
            </div>
            {report.security.newDevices.map((d) => (
              <div key={d.at} style={{ fontSize: 13, color: '#b42318', marginTop: 6 }}>
                New device: <b>{d.label}</b> at {new Date(d.at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}. If this was not you, change CRM_PASSWORD and JWT_SECRET in Vercel.
              </div>
            ))}
            {report.security.recent.length > 0 && (
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {report.security.recent.map((r) => (
                  <div key={r.at} style={{ fontSize: 12, color: '#587066' }}>
                    {new Date(r.at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} · {r.device} · {r.where}{r.ip ? ` · ${r.ip}` : ''}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={tile}>
            <p style={head}>Why tasks came to you</p>
            {report.topReasons.length === 0 ? <div style={{ fontSize: 13, color: '#7a8c85' }}>No tasks in the last 24 hours.</div> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {report.topReasons.map((r) => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#0B2E24' }}>{r.label}</span><b>{r.count}</b>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <People title="Waiting on us" empty="Nobody is waiting for an answer." people={report.waitingOnUs} onOpenChat={onOpenChat} tone="#b42318" />
            <People title="Stuck after paying (2+ days)" empty="Nobody is stuck." people={report.stuckAfterPayment} onOpenChat={onOpenChat} tone="#b54708" />
          </div>
        </>
      )}
    </div>
  );
}
