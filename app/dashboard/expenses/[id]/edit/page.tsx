import Form from '@/components/edit-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { fetchExpenseById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expense - Edit expense',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [expense] = await Promise.all([fetchExpenseById(id)]);
  const { userId } = auth();

  if (!expense) notFound();
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
