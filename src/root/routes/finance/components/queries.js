const GET_USER = `
  query getUser ($userId: uuid!) {
    users(
      where: { id: { _eq: $userId } },
    ) {
      name
    }
  }
`;

export { GET_USER };
