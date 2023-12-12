const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'John',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const expenses = [
  {
    user_id: users[0].id,
    amount: 400,
    date: '2022-12-13',
  },
  {
    user_id: users[0].id,
    amount: 20,
    date: '2022-12-13',
  },
  {
    user_id: users[0].id,
    amount: 300,
    date: '2022-12-13',
  },
  {
    user_id: users[0].id,
    amount: 1000,
    date: '2022-12-13',
  },
  {
    user_id: users[0].id,
    amount: 10,
    date: '2022-12-13',
  },
  {
    user_id: users[0].id,
    amount: 25,
    date: '2022-12-13',
  },
  {
    user_id: users[0].id,
    amount: 56,
    date: '2022-12-13',
  },
];

module.exports = {
  users,
  expenses,
};
