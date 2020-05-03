// const GET_REPORT_DATA = `
// query getReportData($userId: uuid!, $startTime: timestamptz!, $endTime: timestamptz!) {
//   transactions(where: {
//     _and: [
//       {_or: [{splits: {user_id: {_eq: $userId}}}, {paid_id: {_eq: $userId}}]}
//      ,{created_at: {_lte: $endTime}},{created_at: {_gte: $startTime}}
//     ]}, order_by: {created_at: desc}) {
//     created_at
//     amount
//     paid_id
//     splits {
//       user_id
//       percentage
//     }
//   }
// }
// `;

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

const GET_RECENT_TRANSACTIONS = `
  query getTransactions ($userId: uuid!) {
    transactions(
      order_by: { created_at: desc },
      where: {
        _or: [
          {splits: {user_id: {_eq: $userId}}},
          {paid_id: {_eq: $userId}}
        ]
      },
      limit: 10
    ) {
      name
      id
      amount
      paid_id
      created_at
      splits {
        user_id
        percentage
      }
    }
  }
`;

export { GET_RECENT_TRANSACTIONS, GET_REPORT_DATA };
