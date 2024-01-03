import Form from '@/components/create-form';
import Breadcrumbs from '@/components/breadcrumbs';

export default async function Page() {
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
