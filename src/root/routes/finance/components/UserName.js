import React from "react";
import { useQuery } from "graphql-hooks";

import { GET_USER } from "./queries";

const UserName = ({ userId }) => {
  const { data } = useQuery(GET_USER, { variables: { userId } });

  return <span>{data?.users[0].name}</span>;
};

export { UserName };
