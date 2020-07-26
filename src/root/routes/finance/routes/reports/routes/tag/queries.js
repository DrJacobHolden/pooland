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

export { GET_RECENT_TRANSACTIONS };
