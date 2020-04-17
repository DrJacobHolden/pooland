const GET_RECENT_TRANSACTIONS = `
  query getTransactions {
    transactions(order_by: { created_at: desc }, limit: 10) {
      name
      created_at
      id
      amount
      tags {
        name
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

export { GET_RECENT_TRANSACTIONS, DELETE_TRANSACTION };
