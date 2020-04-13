import React from "react";
import { Route } from "react-router-dom";

import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

import { AddTransactionForm } from "./routes/add/AddTransactionForm";

const TransactionsRouter = () => (
  <TerminalSwitch>
    <Route path="/finance/transactions/add" component={AddTransactionForm} />
  </TerminalSwitch>
);

export { TransactionsRouter };
