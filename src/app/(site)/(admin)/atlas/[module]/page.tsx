// Placeholder screens for Atlas modules that are not built yet (decision 014).
// Behind the CRM login. Any other name is a 404.
import { redirect, notFound } from 'next/navigation';
import { sessionValid } from '@/lib/will/auth';
import styles from '@/components/atlas/atlas.module.css';

export const dynamic = 'force-dynamic';

const BUILDING: Record<string, { name: string; note: string }> = {
  accounts: { name: 'Accounting', note: 'Bank lines and the books will live here.' },
  social_wht: { name: 'Social Media (WHT)', note: 'WHT social media will connect here.' },
  social_svt: { name: 'Social Media (SVT)', note: 'SVT social media will connect here.' },
};

export default async function AtlasModulePage({ params }: { params: Promise<{ module: string }> }) {
  if (!(await sessionValid())) redirect('/crm');
  const { module } = await params;
  const entry = BUILDING[module];
  if (!entry) notFound();
  return (
    <main className={styles.page}>
      <p>
        <a href="/atlas">Back to Atlas</a>
      </p>
      <h1 style={{ fontSize: 24, fontWeight: 500, margin: '24px 0 8px' }}>{entry.name}</h1>
      <p style={{ color: 'var(--ink-2)', margin: 0 }}>{entry.note}</p>
      <p style={{ color: 'var(--ink-3)', marginTop: 16 }}>Under construction</p>
    </main>
  );
}
