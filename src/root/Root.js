import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthWrapper } from "root/wrappers/AuthWrapper";
import { RootRouter } from "./RootRouter";

const Root = () => (
  <BrowserRouter>
    <AuthWrapper>
      <RootRouter />
    </AuthWrapper>
  </BrowserRouter>
);

export { Root };
