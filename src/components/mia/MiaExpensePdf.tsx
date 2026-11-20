'use client';
// Build one expense/income category PDF for a Mia customer. Uses the same CRM endpoint
// as Will (it works for any customer id), so the output and storage are identical.
import { useState } from 'react';

export default function MiaExpensePdf({ customerId }: { customerId: string }) {
  const [taxYear, setTaxYear] = useState('2025-26');
  const [category, setCategory] = useState('Income');
  const [date, setDate] = useState('');
  const [supplier, setSupplier] = useState('');
  const [amount, setAmount] = useState('');
  const [kind, setKind] = useState<'income_abn' | 'expense'>('income_abn');
  const [result, setResult] = useState<string | null>(null);

  const build = async () => {
    // 18 Nov (audit): "1,250" is 1250 and "1,250.50" is 1250.50; a lone comma before 1-2 digits is a decimal.
    const cleaned = amount.trim().replace(/\s/g, '');
    const value = Number(/^\d+,\d{1,2}$/.test(cleaned) ? cleaned.replace(',', '.') : cleaned.replace(/,/g, ''));
    if (!Number.isFinite(value) || value < 0) { setResult('Error: amount must be a number'); return; }
    try {
      const r = await fetch('/api/crm/expense-pdf', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          customerId, taxYear, category,
          items: [{ date, supplier, amount: value, summary: '', kind }],
        }),
      });
      const d = await r.json().catch(() => ({ ok: false, error: 'bad_response' }));
      setResult(d.ok ? `PDF saved: ${d.path}` : `Error: ${d.error}`);
    } catch {
      setResult('Error: network');
    }
  };

  return (
    <div style={{ padding: 12, borderTop: '1px solid #eee' }}>
      <strong>Expense PDF</strong>
      <div>
        <input value={taxYear} onChange={(e) => setTaxYear(e.target.value)} placeholder="2025-26" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
        <select value={kind} onChange={(e) => setKind(e.target.value as 'income_abn' | 'expense')}>
          <option value="income_abn">Income (ABN)</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="Supplier" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
        <button onClick={build} disabled={!date || !supplier || !amount}>Build PDF</button>
      </div>
      {result && <small>{result}</small>}
    </div>
  );
}
