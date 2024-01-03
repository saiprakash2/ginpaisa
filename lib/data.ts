import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  ExpenseForm,
  ExpensesTable,
  LatestExpenseRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import {auth} from '@clerk/nextjs';




export async function fetchRevenue() {
  noStore();
  
  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

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

// export async function fetchCardData() {
//   noStore();
//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
//     const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
//     const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
//     const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

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
