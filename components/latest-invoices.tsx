import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/styles/fonts';
import { LatestExpense } from '@/lib/definitions';
import { fetchLatestExpenses } from '@/lib/data';

export default async function LatestInvoices() {
  const latestExpenses = await fetchLatestExpenses();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Expenses
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestExpenses.map((expense, i) => {
            return (
              <div
                key={expense.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {expense.name}
                </p>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {expense.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
