const GET_DUPLICATE_TRANSACTION = `
  query getTransactions (
    $bank_ref_id: String!
  ) {
    transactions(where: {
      bank_ref_id: {_eq: $bank_ref_id}},
      limit: 1,
      order_by: {created_at: desc}
    ) {
      id
    }
  }
`;

const GET_MATCHING_TRANSACTION = `
  query getTransactions (
    $bank_ref_text: String!
  ) {
    transactions(where: {
      bank_ref_text: {_eq: $bank_ref_text}},
      limit: 1,
      order_by: {created_at: desc}
    ) {
      name
      bank_ref_id
      splits {
        percentage
        user_id
      }
      tags {
        name
      }
    }
  }
`;

export { GET_DUPLICATE_TRANSACTION, GET_MATCHING_TRANSACTION };
