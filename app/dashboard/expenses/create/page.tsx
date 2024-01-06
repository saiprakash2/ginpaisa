import Form from '@/components/create-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expense - Add expense',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Expenses', href: '/dashboard/expenses' },
          {
            label: 'Add Expense',
            href: '/dashboard/expenses/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
