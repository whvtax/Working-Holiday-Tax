import { readFileSync } from 'fs';
import path from 'path';

// Jo, 4 Nov: "Customer sent 98 messages before paying" stopped a customer at the signature
// stage whose bank transfer was never flagged as paid. The guard is for sales stages only.
it('the many-messages-before-payment guard applies to sales stages only', () => {
  const src = readFileSync(path.join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
  const i = src.indexOf('const MAX_INBOUND_BEFORE_PAYMENT');
  expect(src.slice(i, i + 1200)).toMatch(/if \(!customer\.paid && SALES_STATES\.includes\(customer\.state\)\)/);
});
