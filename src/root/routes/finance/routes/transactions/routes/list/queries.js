const DELETE_TRANSACTION = `
  mutation delete_transaction($id: uuid!) {
    delete_transactions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

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
      id
    }
  }
`;

export { DELETE_TRANSACTION, GET_RECENT_TRANSACTIONS };
