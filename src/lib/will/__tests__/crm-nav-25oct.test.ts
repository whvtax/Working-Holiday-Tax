/** Jo, 25 Oct: the Archive tab is removed; the Clients tab reads "Clients 2026-2027" (Jo, 8 Nov). */
import fs from 'fs';
import path from 'path';
const src = (f: string) => fs.readFileSync(path.join(process.cwd(), f), 'utf8');
it('no Archive tab, and Clients 2026', () => {
  const shell = src('src/components/crm/Shell.tsx');
  expect(shell).not.toContain("local('archive'");
  expect(shell).toContain("local('clients', 'Clients 2026-2027', NavIcons.clients)");
  const dash = src('src/app/(site)/crm/dashboard/DashboardClient.tsx');
  expect(dash).not.toContain("view==='archive'");
  expect(dash).not.toContain('loadArchived');
});
