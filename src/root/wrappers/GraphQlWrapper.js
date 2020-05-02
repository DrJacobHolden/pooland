import React from "react";
import { ClientContext, GraphQLClient } from "graphql-hooks";
import { useAuth } from "react-use-auth";

const client = new GraphQLClient({
  url: "https://poo-land.herokuapp.com/v1/graphql"
});

function GraphQlWrapper({ children }) {
  const { authResult } = useAuth();

  client.setHeader("Authorization", `Bearer ${authResult?.idToken}`);

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
}

export { GraphQlWrapper };
