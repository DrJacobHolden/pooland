import React, { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "react-use-auth";

import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

import { LandingPage } from "./LandingPage";
import { Finance } from "./routes/finance/Finance";

function RootRouter() {
  const { handleAuthentication, isAuthenticated, isAuthenticating } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/auth0_callback") {
      handleAuthentication();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticating) {
      setIsLoading(false);
    }
  }, [isAuthenticating]);

  if (isAuthenticating || isLoading) {
    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <Spin style={{ margin: "auto" }} />
      </div>
    );
  }

  if (isAuthenticated()) {
    return (
      <TerminalSwitch>
        <Route path="/finance" component={Finance} />
        <Route exact path="/" component={LandingPage} />
      </TerminalSwitch>
    );
  }

  return <LandingPage />;
}

export { RootRouter };
