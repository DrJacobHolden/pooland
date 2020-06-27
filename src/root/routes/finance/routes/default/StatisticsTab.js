import React, { useState } from "react";
import {
  addWeeks,
  startOfWeek,
  lastDayOfWeek,
  startOfMonth,
  lastDayOfMonth,
} from "date-fns";
import { Select, Form } from "antd";
import { StatisticsSection } from "./statistics-section/StatisticsSection";
import { SpendByTag } from "./SpendByTag";

const PERIOD_OPTIONS = {
  "This Week": {
    period: {
      startDate: startOfWeek(new Date()),
      endDate: lastDayOfWeek(new Date()),
    },
    comparison: {},
  },
  "This Fortnight": {
    period: {
      startDate: startOfWeek(addWeeks(new Date(), -1)),
      endDate: lastDayOfWeek(new Date()),
    },
    comparison: {},
  },
  "This Month": {
    period: {
      startDate: startOfMonth(new Date()),
      endDate: lastDayOfMonth(new Date()),
    },
    comparison: {},
  },
  lifetime: null,
};

export const StatisticsTab = () => {
  const [period, setPeriod] = useState("This Fortnight");
  return (
    <div>
      <Form>
        <Form.Item label="Period">
          <Select value={period} onChange={setPeriod}>
            {Object.keys(PERIOD_OPTIONS).map(option => (
              <Select.Option value={option} key={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <StatisticsSection period={PERIOD_OPTIONS[period]} />
      <SpendByTag period={PERIOD_OPTIONS[period]} />
    </div>
  );
};
