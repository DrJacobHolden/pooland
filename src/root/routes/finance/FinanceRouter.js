import React from "react";
import { Route } from "react-router-dom";

import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

import { Finance } from "./routes/default/Finance";
import { TransactionsRouter } from "./routes/transactions/TransactionsRouter";

const FinanceRouter = () => (
  <TerminalSwitch>
    <Route path="/finance/transactions" component={TransactionsRouter} />
    <Route exact path="/finance" component={Finance} />
  </TerminalSwitch>
);

export { FinanceRouter };
