import React, { useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAuth } from "react-use-auth";

function ApolloWrapper({ children }) {
  const { authResult } = useAuth();

  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
          uri: "https://poo-land.herokuapp.com/v1/graphql",
          headers: {
            Authorization: `Bearer ${authResult?.idToken}`,
          },
        }),
      }),
    [authResult]
  );

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export { ApolloWrapper };
