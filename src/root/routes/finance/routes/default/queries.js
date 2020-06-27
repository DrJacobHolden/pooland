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

const DELETE_TRANSACTION = `
  mutation delete_transaction($id: uuid!) {
    delete_transactions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const GET_SPENT_BY_TAG = `
query getSpentByTag{
  spent_by_tag(order_by: {total: desc}) {
    name
    total
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
      tags {
        name
      }
    }
  }
`;

export {
  GET_RECENT_TRANSACTIONS,
  DELETE_TRANSACTION,
  GET_SPENT_BY_TAG,
  GET_TRANSACTIONS_FOR_RANGE,
};
