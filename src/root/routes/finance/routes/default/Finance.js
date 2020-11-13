import React, { useContext } from "react";
import { Row, Col } from "antd";

import { FinancePage } from "../../components/FinancePage";
import { LifetimeStatistics } from "./components/LifetimeStatistics";
import { SpendByTag } from "./components/SpendByTag";
import { RelativePeriodSpendBar } from "./components/RelativePeriodSpendBar";
import { PeriodText } from "./components/PeriodText";
import { PeriodSpendBarGraph } from "./components/PeriodSpendBarGraph";
import { PeriodSelect } from "./components/PeriodSelect";
import { FinanceContext } from "../../FinanceWrapper";

const Finance = () => {
  const { period, setPeriod } = useContext(FinanceContext);

  return (
    <FinancePage header="Finance Dashboard">
      <div
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <LifetimeStatistics />
        <Row>
          <Col xs={24} sm={16} md={8}>
            <PeriodSelect onPeriodChange={setPeriod} />
          </Col>
        </Row>
        <Row style={{ padding: "0px 16px 16px", fontSize: 18 }}>
          <PeriodText />
        </Row>
        {period && <RelativePeriodSpendBar />}
        <SpendByTag />
        {period && <PeriodSpendBarGraph />}
      </div>
    </FinancePage>
  );
};

export { Finance };
