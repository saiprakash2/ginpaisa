'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {auth} from '@clerk/nextjs';

const FormSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    date: z.string(),
  });
   
  
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
  
const CreateExpense = FormSchema.omit({ id: true, user_id:true, date: true });

  
export async function createExpense(prevState: State, formData: FormData) {
  const validatedFields = CreateExpense.safeParse({
        amount: formData.get('amount'),
    });
  const { userId } = auth();

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Expense.',
      };
    }

    const {amount} = validatedFields.data;
  
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {      
      await sql`
      INSERT INTO expenses (user_id, amount, date)
      VALUES (${userId}, ${amountInCents}, ${date})
    `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Expense.',
      };
    }


  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
}


const UpdateExpense = FormSchema.omit({ id: true, user_id:true, date: true });

export async function updateExpense(id: string, formData: FormData) {
  const { amount } = UpdateExpense.parse({
    amount: formData.get('amount')
  });
 
  const amountInCents = amount * 100;

  try {    
    await sql`
      UPDATE expenses
      SET amount = ${amountInCents}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message:'Databse Error: Failed to Update Expense.',
    };
  }
 
 
  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
}

export async function deleteExpense(id: string) {
  throw new Error('Failed to Delete Invoice');
  
}