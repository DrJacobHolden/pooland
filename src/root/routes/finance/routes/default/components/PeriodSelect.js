import React, { useEffect, useState } from "react";
import { Select, Form } from "antd";

import { DEFAULT_PERIOD, PERIOD_OPTIONS } from "../../../constants";

const PeriodSelect = ({ onPeriodChange }) => {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);

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
