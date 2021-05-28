import { useLocation, useHistory } from "react-router-dom";
import { Tabs } from "antd";

const LandingTabs = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  return (
    <Tabs
      defaultActiveKey={pathname}
      onChange={push}
      tabBarStyle={{ paddingLeft: 16 }}
    >
      <Tabs.TabPane tab="Dashboard" key={"/finance/dashboard"} />
      <Tabs.TabPane tab="Transactions" key={"/finance/transactions"} />
    </Tabs>
  );
};

export { LandingTabs };
