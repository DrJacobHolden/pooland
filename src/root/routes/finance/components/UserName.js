import React, { useEffect } from "react";
import { useQuery } from "graphql-hooks";

import { GET_USER } from "./queries";

const cache = {};

const UserName = ({ userId }) => {
  if (cache[userId]) {
    return <span>{cache[userId]}</span>;
  }

  return <UncachedUserName userId={userId} />;
};

const UncachedUserName = ({ userId }) => {
  const { data } = useQuery(GET_USER, { variables: { userId } });

  useEffect(() => {
    if (data) {
      cache[userId] = data.users[0].name;
    }
  }, [data]);

  return <span>{data ? data.users[0].name : "loading..."}</span>;
};

export { UserName };
