import { sql } from '@vercel/postgres';
import {
  ExpenseForm,
  ExpensesTable,
  LatestExpenseRaw,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import {auth} from '@clerk/nextjs';


export async function fetchLatestExpenses() {
  noStore();
  const { userId } = auth();

  try {
    const data = await sql<LatestExpenseRaw>`
      SELECT expenses.amount, expenses.id, expenses.name
      FROM expenses
      where
      expenses.user_id::text = ${userId}
      ORDER BY expenses.created_date DESC
      LIMIT 5`;

    const latestExpenses = data.rows.map((expense) => ({
      ...expense,
      amount: formatCurrency(expense.amount),
    }));
    return latestExpenses;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest expenses.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredExpenses(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const { userId } = auth();

  try {
    const expenses = await sql<ExpensesTable>`
      SELECT
        expenses.id,
        expenses.name,
        expenses.type,
        expenses.amount,
        expenses.created_date
      FROM expenses
      WHERE
        expenses.user_id::text = ${userId} AND
        (expenses.amount::text ILIKE ${`%${query}%`} OR
        expenses.name::text ILIKE ${`%${query}%`} OR
        expenses.created_date::text ILIKE ${`%${query}%`})
      ORDER BY expenses.created_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return expenses.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expenses.');
  }
}

export async function fetchExpensesPages(query: string) {
  noStore();
  const { userId } = auth();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM expenses
    WHERE
      expenses.user_id::text = ${userId} AND
      (expenses.amount::text ILIKE ${`%${query}%`} OR
      expenses.created_date::text ILIKE ${`%${query}%`})
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of expenses.');
  }
}

export async function fetchExpenseById(id: string) {
  noStore();
  const { userId } = auth();
  try {
    const data = await sql<ExpenseForm>
    `SELECT
        expenses.id,
        expenses.amount,
        expenses.name
      FROM expenses
      WHERE expenses.id = ${id} AND 
      expenses.user_id = ${userId}
    `;

    const expense = data.rows.map((expense) => ({
      ...expense,
      // Convert amount from cents to dollars
      amount: expense.amount / 100,
    }));

    return expense[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expense.');
  }
}
