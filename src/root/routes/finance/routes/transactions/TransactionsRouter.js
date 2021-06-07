import { Route } from "react-router-dom";

import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

import { AddTransaction } from "./routes/add/AddTransaction";
import { ImportTransactions } from "./routes/import/ImportTransactions";
import { ListTransactions } from "./routes/default/ListTransactions";

const TransactionsRouter = () => (
  <TerminalSwitch>
    <Route path="/finance/transactions/add" component={AddTransaction} />
    <Route path="/finance/transactions/import" component={ImportTransactions} />
    <Route path="/finance/transactions" component={ListTransactions} />
  </TerminalSwitch>
);

export { TransactionsRouter };
