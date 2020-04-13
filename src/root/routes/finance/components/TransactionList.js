import React from "react";
import { formatRelative } from "date-fns";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "root/helpers/useUser";

const GET_TRANSACTIONS = gql`
  query getTransactions($userId: uuid!) {
    transactions(
      limit: 10
      order_by: { created_at: desc }
      where: { paid_id: { _eq: $userId } }
    ) {
      name
      created_at
      id
      amount
    }
  }
`;

function TransactionList() {
  const userId = useUser();
  const { loading, data } = useQuery(GET_TRANSACTIONS, {
    variables: { userId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.transactions.map(({ amount, created_at: created, name, id }) => (
        <li key={id}>
          {amount} on {name} - {formatRelative(new Date(created), new Date())}
        </li>
      ))}
    </ul>
  );
}

export { TransactionList };
