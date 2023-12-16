'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    amount: z.coerce.number(),
    date: z.string(),
  });
   
const CreateExpense = FormSchema.omit({ id: true, user_id:true, date: true });
 
export async function createExpense(formData: FormData) {
    const { amount } = CreateExpense.parse({
        amount: formData.get('amount'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO expenses (user_id, amount, date)
    VALUES ('410544b2-4001-4271-9855-fec4b6a6442a', ${amountInCents}, ${date})
  `;

  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
}


const UpdateExpense = FormSchema.omit({ id: true, user_id:true, date: true });

export async function updateExpense(id: string, formData: FormData) {
  const { amount } = UpdateExpense.parse({
    amount: formData.get('amount')
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE expenses
    SET amount = ${amountInCents}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
}

export async function deleteExpense(id: string) {
    await sql`DELETE FROM expenses WHERE id = ${id}`;
    revalidatePath('/dashboard/expenses');
  }