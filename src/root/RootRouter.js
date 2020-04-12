import React, { useContext, useEffect } from "react";
import { Button, Spin } from "antd";
import { useHistory, useLocation } from "react-router-dom";

import { AuthContext } from "root/wrappers/AuthWrapper";
import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

function RootRouter() {
  const { checkLogin, parseLogin, signIn, signedIn } = useContext(AuthContext);
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

  if (signedIn) return <TerminalSwitch />;

  return (
    <div>
      <Button onClick={signIn}>Sign In with Auth0</Button>
    </div>
  );
}

export { RootRouter };
