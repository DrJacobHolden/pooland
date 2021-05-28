import { Route, Switch } from "react-router-dom";
import { Card, Layout, Typography } from "antd";

function TerminalSwitch({ children }) {
  const NotFound = () => (
    <Layout>
      <Card title="404">
        <Typography.Text type="danger">
          Whatever you&apos;re looking for, it&apos;s not here.
        </Typography.Text>
      </Card>
    </Layout>
  );

  return (
    <Switch>
      {children}
      <Route component={NotFound} />
    </Switch>
  );
}

export { TerminalSwitch };
