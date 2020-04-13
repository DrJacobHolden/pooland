import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ApolloWrapper } from "root/wrappers/ApolloWrapper";
import { AuthWrapper } from "root/wrappers/AuthWrapper";
import { RootRouter } from "./RootRouter";

const Root = () => (
  <BrowserRouter>
    <AuthWrapper>
      <ApolloWrapper>
        <RootRouter />
      </ApolloWrapper>
    </AuthWrapper>
  </BrowserRouter>
);

export { Root };
