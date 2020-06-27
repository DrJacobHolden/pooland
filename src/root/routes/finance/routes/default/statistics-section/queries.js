const GET_SPENT = `
query getSpent{
  spent_totals {
    amount
  }
}
`;

const GET_OWED = `
query getOwed{
  owed_totals {
    owes
    amount
    to
  }
}
`;

const GET_TRANSACTIONS_FOR_RANGE = `
  query getTransactions (
    $startDate: timestamptz!,
    $endDate: timestamptz!
  ) {
    transactions(
      where: {
        _and: [
          {
            created_at: {
              _gte: $startDate
            }
          },
          {
            created_at: {
              _lte: $endDate
            }
          }
        ]
      }
    ) {
      amount
      paid_id
      splits {
        user_id
        percentage
      }
    }
  }
`;

export { GET_SPENT, GET_OWED, GET_TRANSACTIONS_FOR_RANGE };
