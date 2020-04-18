const GET_WEEKLY_STATS = `
query getTransactions{
  transactions(where: {
    created_at: {
      _gte: "${new Date(
        new Date().getTime() - 7 * 24 * 60 * 60 * 1000
      ).toISOString()}"
    },
    _and: {
      created_at: {
        _lte: "${new Date().toISOString()}"
      }
    }
  }, order_by: {created_at: desc}) {
    amount
    paid_id
    splits {
      percentage
      user_id
    }
  }
}
`;

export { GET_WEEKLY_STATS };
