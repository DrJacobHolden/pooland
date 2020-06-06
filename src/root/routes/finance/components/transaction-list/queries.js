const GET_DONUT_DATA = `
  query getTransactions ($transactionId: uuid!) {
    transactions(
      where: {id: {_eq: $transactionId}}
    ) {
      amount
      paid_id
      owner {
        name
      }
      splits {
        percentage
        user_id
        user {
          name
        }
      }
    }
  }
`;

const GET_LIST_ITEM_DATA = `
  query getTransactions ($transactionId: uuid!) {
    transactions(
      where: {id: {_eq: $transactionId}}
    ) {
      amount
      paid_id
      created_at
      name
      tags {
        name
      }
    }
  }
`;

export { GET_DONUT_DATA, GET_LIST_ITEM_DATA };
