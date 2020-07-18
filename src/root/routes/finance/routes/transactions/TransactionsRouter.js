import React from "react";
import { Route } from "react-router-dom";

import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

import { AddTransactionForm } from "./routes/add/AddTransactionForm";
import { ListTransactions } from "./routes/list/ListTransactions";

const TransactionsRouter = () => (
  <TerminalSwitch>
    <Route path="/finance/transactions/add" component={AddTransactionForm} />
    <Route path="/finance/transactions/list" component={ListTransactions} />
  </TerminalSwitch>
);

export { TransactionsRouter };
