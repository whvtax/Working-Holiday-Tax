// Server only. Runs the three read-only lookups Atlas can ask for.
import { getStore } from '@/lib/will/store';
import { findCustomers, customerMessages, taskList } from './lookup';

export async function runAtlasTool(name: string, input: Record<string, unknown>): Promise<unknown> {
  const store = getStore();
  if (name === 'find_customers') {
    return findCustomers(await store.listCustomers(), String(input.query ?? ''), input.limit);
  }
  if (name === 'get_customer_messages') {
    const id = typeof input.customerId === 'string' ? input.customerId : '';
    const customer = id ? await store.getCustomerById(id) : null;
    if (!customer) return { error: 'no_such_customer' };
    return { name: customer.name, messages: customerMessages(await store.listMessages(customer.id), input.limit) };
  }
  if (name === 'list_tasks') {
    return taskList(await store.listTasks(), input.status, input.limit);
  }
  return { error: 'unknown_tool' };
}
