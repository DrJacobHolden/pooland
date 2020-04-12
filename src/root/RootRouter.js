import React, { useContext, useEffect } from "react";
import { Spin } from "antd";
import { Route, useHistory, useLocation } from "react-router-dom";

import { AuthContext } from "root/wrappers/AuthWrapper";
import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

import { LandingPage } from "./LandingPage";

function RootRouter() {
  const { checkLogin, parseLogin, signedIn } = useContext(AuthContext);
  const { pathname } = useLocation("/login");
  const history = useHistory();

  useEffect(() => {
    if (pathname === "/login") {
      parseLogin().then(() => {
        checkLogin();
        history.replace("/");
      });
    } else {
      checkLogin();
    }
  }, []);

  if (signedIn === undefined) {
    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <Spin style={{ margin: "auto" }} />
      </div>
    );
  }

  if (signedIn) {
    return (
      <TerminalSwitch>
        <Route path="/" component={LandingPage} />
      </TerminalSwitch>
    );
  }

  return <LandingPage />;
}

export { RootRouter };
