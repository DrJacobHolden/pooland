import { BrowserRouter } from "react-router-dom";

import { AuthWrapper } from "root/wrappers/AuthWrapper";
import { GraphQlWrapper } from "root/wrappers/GraphQlWrapper";
import { RootRouter } from "./RootRouter";

const Root = () => (
  <BrowserRouter>
    <AuthWrapper>
      <GraphQlWrapper>
        <RootRouter />
      </GraphQlWrapper>
    </AuthWrapper>
  </BrowserRouter>
);

export { Root };
