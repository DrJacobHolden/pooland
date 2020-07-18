import React, { useState } from "react";
import { Select, Form, Row, Col } from "antd";

import { FinancePage } from "../../components/FinancePage";
import { LifetimeStatistics } from "./components/LifetimeStatistics";
import { SpendByTag } from "./components/SpendByTag";
import { PERIOD_OPTIONS } from "./constants";
import { RelativePeriodSpendBar } from "./components/RelativePeriodSpendBar";

const Finance = () => {
  const [period, setPeriod] = useState("This Fortnight");

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
            <Form.Item label="Period">
              <Select value={period} onChange={setPeriod}>
                {Object.keys(PERIOD_OPTIONS).map(option => (
                  <Select.Option value={option} key={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {period !== "Lifetime" && (
          <RelativePeriodSpendBar period={PERIOD_OPTIONS[period]} />
        )}
        <SpendByTag period={PERIOD_OPTIONS[period]} />
      </div>
    </FinancePage>
  );
};

export { Finance };
