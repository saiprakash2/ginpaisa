import Form from '@/components/edit-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { fetchExpenseById } from '@/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [expense] = await Promise.all([fetchExpenseById(id)]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Expenses', href: '/dashboard/expenses' },
          {
            label: 'Edit Expense',
            href: `/dashboard/expenses/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form expense={expense} />
    </main>
  );
}
