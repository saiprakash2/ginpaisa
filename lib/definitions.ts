
export type LatestExpense = {
  id: string;
  amount: string;
  name: string;
  created_date: string;
};

export type LatestExpenseRaw = Omit<LatestExpense, 'amount'> & {
  amount: number;
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

export type ExpenseForm = {
  id: string;
  name:string;
  amount: number;
};
