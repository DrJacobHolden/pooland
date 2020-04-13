import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  {
    users {
      id
      name
    }
  }
`;

function Finance() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.users.map(({ name, id }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}

export { Finance };
