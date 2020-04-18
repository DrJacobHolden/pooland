const GET_USER = `
  query getUser ($userId: uuid!) {
    users(
      where: { id: { _eq: $userId } },
    ) {
      name
    }
  }
`;

const GET_RECENT_TRANSACTIONS = `
  query getTransactions ($userId: uuid!) {
    transactions(
      order_by: { created_at: desc },
      where: { paid_id: { _eq: $userId } },
      limit: 10
    ) {
      name
      created_at
      id
      amount
      tags {
        name
      }
      splits {
        percentage
      }
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

export { GET_USER, GET_RECENT_TRANSACTIONS, DELETE_TRANSACTION };
