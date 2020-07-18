import React, { useState } from "react";
import { addMonths, addWeeks, startOfWeek, startOfMonth } from "date-fns";
import { Select, Form, Row, Checkbox, Col } from "antd";
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
    comparison: {
      startDate: startOfWeek(addWeeks(now, -1)),
      endDate: startOfWeek(now),
    },
    averageFunction: getWeeksInRange,
  },
  "This Fortnight": {
    period: {
      startDate: startOfWeek(addWeeks(now, -1)),
      endDate: startOfWeek(addWeeks(now, 1)),
    },
    comparison: {
      startDate: startOfWeek(addWeeks(now, -3)),
      endDate: startOfWeek(addWeeks(now, -1)),
    },
    averageFunction: getFortnightsInRange,
  },
  "This Month": {
    period: {
      startDate: startOfMonth(now),
      endDate: startOfMonth(addMonths(now, 1)),
    },
    comparison: {
      startDate: startOfMonth(addMonths(now, -1)),
      endDate: startOfMonth(now),
    },
    averageFunction: getMonthsInRange,
  },
  Lifetime: null,
};

export const StatisticsTab = () => {
  const [period, setPeriod] = useState("This Fortnight");
  const [comparisons, setComparisons] = useState(true);
  return (
    <div>
      <Row>
        <Col xs={24} sm={16} md={8}>
          <Form.Item label="Period">
            <Select
              value={period}
              onChange={val => {
                if (val === "Lifetime") {
                  setComparisons(false);
                }
                setPeriod(val);
              }}
            >
              {Object.keys(PERIOD_OPTIONS).map(option => (
                <Select.Option value={option} key={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item label="Enable Comparisons">
            <Checkbox
              disabled={period === "Lifetime"}
              checked={comparisons}
              onChange={() => setComparisons(!comparisons)}
            />
          </Form.Item>
        </Col>
      </Row>
      <StatisticsSection
        period={PERIOD_OPTIONS[period]}
        comparisonEnabled={comparisons}
      />
      <SpendByTag
        period={PERIOD_OPTIONS[period]}
        comparisonEnabled={comparisons}
      />
    </div>
  );
};
