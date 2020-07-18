import React, { useContext, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { Spin } from "antd";

import { AuthContext } from "root/wrappers/AuthWrapper";
import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

import { LandingPage } from "./LandingPage";
import { FinanceRouter } from "./routes/finance/FinanceRouter";

function RootRouter() {
  const {
    handleAuthentication,
    isAuthenticated,
    isAuthenticating,
  } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/auth0_callback") {
      handleAuthentication();
    }
  }, []);

  if (isAuthenticating) {
    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <Spin style={{ margin: "auto" }} />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <TerminalSwitch>
        <Route path="/finance" component={FinanceRouter} />
        <Route exact path="/" component={LandingPage} />
      </TerminalSwitch>
    );
  }

  return <LandingPage />;
}

export { RootRouter };
