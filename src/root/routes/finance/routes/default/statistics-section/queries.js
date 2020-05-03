const GET_SPENT = `
query getSpent{
  spent_totals {
    amount
  }
}
`;

const GET_OWED = `
query getOwed{
  owed_totals {
    owes
    amount
    to
  }
}
`;

export { GET_SPENT, GET_OWED };
