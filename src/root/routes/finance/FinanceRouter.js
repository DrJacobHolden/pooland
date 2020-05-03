import React from "react";
import { Route } from "react-router-dom";

import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

import { Finance } from "./routes/default/Finance";
import { ReportsRouter } from "./routes/reports/ReportsRouter";
import { TransactionsRouter } from "./routes/transactions/TransactionsRouter";

const FinanceRouter = () => (
  <TerminalSwitch>
    <Route path="/finance/reports" component={ReportsRouter} />
    <Route path="/finance/transactions" component={TransactionsRouter} />
    <Route exact path="/finance" component={Finance} />
  </TerminalSwitch>
);

export { FinanceRouter };
