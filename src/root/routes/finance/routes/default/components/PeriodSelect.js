import React, { useContext, useEffect, useState } from "react";
import { Select, Form } from "antd";

import { PERIOD_OPTIONS } from "../../../constants";
import { FinanceContext } from "root/routes/finance/FinanceWrapper";

const PeriodSelect = ({ onPeriodChange }) => {
  const { period: currentPeriod } = useContext(FinanceContext);
  const [period, setPeriod] = useState(currentPeriod?.key || "Lifetime");

  useEffect(() => {
    onPeriodChange && onPeriodChange(PERIOD_OPTIONS[period]);
  }, [period]);

  return (
    <Form.Item label="Period" style={{ margin: 0 }}>
      <Select value={period} onChange={setPeriod}>
        {Object.keys(PERIOD_OPTIONS).map(option => (
          <Select.Option value={option} key={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export { PeriodSelect };
