import Form from '@/components/create-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { fetchCustomers } from '@/lib/data';

export default async function Page() {
  //   const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Expenses', href: '/dashboard/expenses' },
          {
            label: 'Create Expense',
            href: '/dashboard/expenses/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
