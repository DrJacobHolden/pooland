import { Redirect, Route } from "react-router-dom";

import { TerminalSwitch } from "root/components/routing/TerminalSwitch";

import { FinanceWrapper } from "./FinanceWrapper";
import { ReportsRouter } from "./routes/reports/ReportsRouter";
import { TransactionsRouter } from "./routes/transactions/TransactionsRouter";
import { FinanceDashboard } from "./routes/dashboard/FinanceDashboard";

const FinanceRouter = () => (
  <FinanceWrapper>
    <TerminalSwitch>
      <Route path="/finance/reports" component={ReportsRouter} />
      <Route path="/finance/transactions" component={TransactionsRouter} />
      <Route path="/finance/dashboard" component={FinanceDashboard} />
      <Route
        exact
        path="/finance"
        render={() => <Redirect to="/finance/dashboard" />}
      />
    </TerminalSwitch>
  </FinanceWrapper>
);

export { FinanceRouter };
