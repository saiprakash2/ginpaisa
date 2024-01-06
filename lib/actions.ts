'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {auth} from '@clerk/nextjs';


const FormSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    name: z.string().refine(value => value.trim() !== '', {
      message: 'Please enter a name.',
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    date: z.string(),
  });
   
  
export type State = {
  errors?: {
    customerId?: string[];
    name?:string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
  
const CreateExpense = FormSchema.omit({ id: true, user_id:true, date: true });

  
export async function createExpense(prevState: State, formData: FormData) {
  const validatedFields = CreateExpense.safeParse({
        amount: formData.get('amount'),
        name: formData.get('name'),
    });
  const { userId } = auth();

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Expense.',
      };
    }

    const {amount} = validatedFields.data;
    const {name} = validatedFields.data;

  
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    const type = "Food";

    try {      
      await sql`
      INSERT INTO expenses (user_id, name, type, amount, created_date, updated_date)
      VALUES (${userId}, ${name}, ${type}, ${amountInCents}, ${date}, ${date})
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

export async function updateExpense(id: string,formData: FormData) {
  const { amount, name } = UpdateExpense.parse({
    amount: formData.get('amount'),
    name: formData.get('name')
  });
 
  const amountInCents = amount * 100;

  try {    
    await sql`
      UPDATE expenses
      SET amount = ${amountInCents}, name = ${name}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message:'Database Error: Failed to Update Expense.',
    };
  }
 
 
  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
}

export async function deleteExpense(id: string) {

  try {
    await sql`
    Delete from expenses 
    WHERE id =${id}
    `;
  } catch (error) {
    return {
      message:'Database Error: Failed to Delete Expense.',
    };
  }
  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
}