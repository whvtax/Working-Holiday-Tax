'use client';
// The "Templates" tab (18 Nov, Jo): the messages Will sends as free text inside
// the 24-hour window, one language at a time. Opening a card uses the Library's
// own editor, so there is one place where wording is changed.
import { useMemo, useState } from 'react';
import type { TemplateRow } from '@/lib/will/store';
import { FREE_TEXT_LANGS, freeTextFamilies, coverage, type FreeTextLang } from '@/lib/will/template-free-text';

const NAMES: Record<FreeTextLang, string> = {
  en: 'English', de: 'German', ja: 'Japanese', es: 'Spanish', fr: 'French',
  it: 'Italian', pt: 'Portuguese', zh: 'Chinese', vi: 'Vietnamese',
};

export default function FreeTextTemplates({ templates, onOpen }: { templates: TemplateRow[]; onOpen: (t: TemplateRow) => void }) {
  const [lang, setLang] = useState<FreeTextLang>('en');
  const families = useMemo(() => freeTextFamilies(templates), [templates]);
  const counts = useMemo(() => coverage(families), [families]);
  const byId = useMemo(() => new Map(templates.map((t) => [t.id, t])), [templates]);

  // Group the families by category, in the order the Library lists them.
  const groups: Record<string, typeof families> = {};
  for (const f of families) (groups[f.category] ??= []).push(f);

  return (
    <section className="view active">
      <h2 className="vt" style={{ margin: 0 }}>Templates</h2>
      <div className="vsub">Messages Will sends as free text inside the 24-hour window, by language. Tap a card to edit it in the Message Library editor.</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '14px 0' }} role="tablist" aria-label="Language">
        {FREE_TEXT_LANGS.map((l) => (
          <button key={l} role="tab" aria-selected={lang === l} className={`chip ${lang === l ? 'active' : ''}`}
            onClick={() => setLang(l)} style={{ cursor: 'pointer' }}>
            {NAMES[l]} <span style={{ opacity: 0.7 }}>{counts[l]}/{families.length}</span>
          </button>
        ))}
      </div>

      {families.length === 0 && <div className="vsub">No free-text messages in the Library yet.</div>}

      {Object.entries(groups).map(([cat, items]) => (
        <div key={cat}>
          <div className="libcat">{cat}<span className="n">{items.length}</span></div>
          <div className="libgrid">
            {items.map((f) => {
              const entry = f.byLang[lang];
              const row = entry ? byId.get(entry.id) : undefined;
              return row ? (
                <div key={f.family} className="tpl" onClick={() => onOpen(row)}>
                  <span className="pencil">✎</span>
                  <div className="tn">{f.title}<span className="chip" style={{ fontSize: 12, marginLeft: 6 }}>{NAMES[lang]}</span></div>
                  <div className="tv" style={{ whiteSpace: 'pre-wrap' }}>{row.body}</div>
                  <div className="tf"><span className="edited">● live</span><span>{row.key}</span></div>
                </div>
              ) : (
                <div key={f.family} className="tpl" style={{ opacity: 0.6 }}>
                  <div className="tn">{f.title}</div>
                  <div className="tv">No {NAMES[lang]} wording in the Library yet.{f.byLang.en ? ' Shown in English in the Library: ' : ''}</div>
                  {f.byLang.en && <div className="tv" style={{ whiteSpace: 'pre-wrap', opacity: 0.8 }}>{f.byLang.en.body}</div>}
                  <div className="tf"><span>{f.family}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
