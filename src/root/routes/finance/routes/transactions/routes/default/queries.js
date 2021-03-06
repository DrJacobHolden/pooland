const DELETE_TRANSACTION = `
  mutation delete_transaction($id: uuid!) {
    delete_transactions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const GET_RECENT_TRANSACTIONS = `
  query getTransactions (
    $userId: uuid!,
    $limit: Int!,
    $offset: Int,
    $startDate: timestamptz!,
    $endDate: timestamptz!
  ) {
    transactions_aggregate(where: {
      _or: [
        {splits: {user_id: {_eq: $userId}}},
        {paid_id: {_eq: $userId}}
      ],
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
        ],
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

      },
      limit: $limit,
      offset: $offset
    ) {
      id
    }
  }
`;

export { DELETE_TRANSACTION, GET_RECENT_TRANSACTIONS };
