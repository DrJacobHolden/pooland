import React, { useContext } from "react";
import { ClientContext, GraphQLClient } from "graphql-hooks";

import { AuthContext } from "root/wrappers/AuthWrapper";

const client = new GraphQLClient({
  url: "https://poo-land.herokuapp.com/v1/graphql",
});

function GraphQlWrapper({ children }) {
  const { authResult } = useContext(AuthContext);

  client.setHeader("Authorization", `Bearer ${authResult}`);

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
}

export { GraphQlWrapper };
