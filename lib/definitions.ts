export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestExpense = {
  id: string;
  amount: string;
};

export type LatestExpenseRaw = Omit<LatestExpense, 'amount'> & {
  amount: number;
  name: string;
};

export type ExpensesTable = {
  id: string;
  user_id:string;
  name:string;
  type:string;
  amount: number;
  created_date: string;
  updated_date: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type ExpenseForm = {
  id: string;
  name:string;
  amount: number;
};
