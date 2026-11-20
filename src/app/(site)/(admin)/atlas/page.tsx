// Atlas command centre (decision 014). Read-only, behind the CRM login.
import { redirect } from 'next/navigation';
import { sessionValid } from '@/lib/will/auth';
import { loadAtlasState } from '@/lib/atlas/load-report';
import { atlasView } from '@/lib/atlas/atlas-view';
import AtlasCentre from '@/components/atlas/AtlasCentre';

export const dynamic = 'force-dynamic';

export default async function AtlasPage() {
  if (!(await sessionValid())) redirect('/login');
  const { report, openTasks, byBrand } = await loadAtlasState();
  // Time of this load, shown next to "Last 24 hours" so Jo can see how fresh
  // the numbers are. Formatted on the server (Melbourne time) to avoid a
  // hydration mismatch.
  const updatedAt = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Melbourne', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(new Date());
  return <AtlasCentre view={atlasView(report, openTasks, byBrand)} updatedAt={updatedAt} />;
}
