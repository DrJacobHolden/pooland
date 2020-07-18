import React, { useState } from "react";
import { addMonths, addWeeks, startOfWeek, startOfMonth } from "date-fns";
import { Select, Form, Row, Col } from "antd";
import { StatisticsSection } from "./statistics-section/StatisticsSection";
import { SpendByTag } from "./SpendByTag";
import {
  getWeeksInRange,
  getFortnightsInRange,
  getMonthsInRange,
} from "../../helpers/date";

const now = new Date();

const PERIOD_OPTIONS = {
  "This Week": {
    period: {
      startDate: startOfWeek(now),
      endDate: startOfWeek(addWeeks(now, 1)),
    },
    averageFunction: getWeeksInRange,
  },
  "This Fortnight": {
    period: {
      startDate: startOfWeek(addWeeks(now, -1)),
      endDate: startOfWeek(addWeeks(now, 1)),
    },
    averageFunction: getFortnightsInRange,
  },
  "This Month": {
    period: {
      startDate: startOfMonth(now),
      endDate: startOfMonth(addMonths(now, 1)),
    },
    averageFunction: getMonthsInRange,
  },
  Lifetime: null,
};

export const StatisticsTab = () => {
  const [period, setPeriod] = useState("This Fortnight");
  return (
    <div>
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
      <StatisticsSection period={PERIOD_OPTIONS[period]} />
      <SpendByTag period={PERIOD_OPTIONS[period]} />
    </div>
  );
};
