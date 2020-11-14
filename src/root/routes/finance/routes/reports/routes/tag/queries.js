const GET_RECENT_TRANSACTIONS = `
  query getTransactions ($tagName: String!, $limit: Int!, $offset: Int) {
    transactions_aggregate(where: {
      tags: {
        name: {_eq: $tagName}
      }
    }) {
      aggregate {
        totalCount: count
      }
    },
    transactions(
      order_by: { created_at: desc },
      where: {
        tags: {
          name: {_eq: $tagName}
        }
      },
      limit: $limit,
      offset: $offset
    ) {
      id
    }
  }
`;

const GET_ALL_TRANSACTIONS_FOR_TAG = `
  query getTransactions ($tagName: String!) {
    transactions(where: {
      tags: {
        name: {
          _eq: $tagName
        }
      }
    },
    order_by: {created_at: desc}) {
      amount
      created_at
      paid_id
      tags {
        name
      }
      splits {
        percentage
        user_id
      }
    }
  }
`;

export { GET_RECENT_TRANSACTIONS, GET_ALL_TRANSACTIONS_FOR_TAG };
