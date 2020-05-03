import React from "react";
import { Route } from "react-router-dom";

import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

import { UserReport } from "./routes/user/UserReport";

const ReportsRouter = () => (
  <TerminalSwitch>
    <Route path="/finance/reports/user/:userId" component={UserReport} />
  </TerminalSwitch>
);

export { ReportsRouter };
