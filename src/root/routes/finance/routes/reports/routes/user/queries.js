const GET_REPORT_DATA = `
query getReportData($userId: uuid!) {
  transactions(where: {
    _or: [{splits: {user_id: {_eq: $userId}}}, {paid_id: {_eq: $userId}}]
  }, order_by: {created_at: desc}) {
    created_at
    amount
    paid_id
    splits {
      user_id
      percentage
    }
  }
}
`;

// TODO: Fix this to not include ALL transactions and only the ones
// that involve the relevant other party.
const GET_RECENT_TRANSACTIONS = `
  query getTransactions ($userId: uuid!, $limit: Int!, $offset: Int) {
    transactions_aggregate(where: {
      _or: [
        {splits: {user_id: {_eq: $userId}}},
        {paid_id: {_eq: $userId}}
      ]
    }) {
      aggregate {
        totalCount: count
      }
    },
    transactions(
      order_by: { created_at: desc },
      where: {
        _or: [
          {splits: {user_id: {_eq: $userId}}},
          {paid_id: {_eq: $userId}}
        ]
      },
      limit: $limit,
      offset: $offset
    ) {
      name
      id
      amount
      paid_id
      created_at
      splits {
        user_id
        percentage
        user {
          name
        }
      }
    }
  }
`;

export { GET_RECENT_TRANSACTIONS, GET_REPORT_DATA };
