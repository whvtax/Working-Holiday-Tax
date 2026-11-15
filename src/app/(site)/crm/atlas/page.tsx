// Atlas command centre (decision 014). Read-only, behind the CRM login.
import { redirect } from 'next/navigation';
import { sessionValid } from '@/lib/will/auth';
import { loadAtlasState } from '@/lib/atlas/load-report';
import { atlasView } from '@/lib/atlas/atlas-view';
import AtlasCentre from '@/components/atlas/AtlasCentre';

export const dynamic = 'force-dynamic';

export default async function AtlasPage() {
  if (!(await sessionValid())) redirect('/crm');
  const { report, openTasks } = await loadAtlasState();
  return <AtlasCentre view={atlasView(report, openTasks)} />;
}
