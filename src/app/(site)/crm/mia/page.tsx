// Mia: status bar, pipeline, tasks and chats. Same CRM session gate as Will.
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateSession } from '@/lib/crm-store';
import MiaStatusBar from '@/components/mia/MiaStatusBar';
import MiaPipeline from '@/components/mia/MiaPipeline';
import MiaTasks from '@/components/mia/MiaTasks';
import MiaChats from '@/components/mia/MiaChats';

export default async function MiaPage() {
  const token = (await cookies()).get('crm_session')?.value;
  if (!validateSession(token)) redirect('/crm');
  return (
    <>
      <MiaStatusBar />
      <MiaPipeline />
      <MiaTasks />
      <MiaChats />
    </>
  );
}
