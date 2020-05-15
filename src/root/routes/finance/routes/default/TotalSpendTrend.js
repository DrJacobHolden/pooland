// TODO: Add ability to select range
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import "chartjs-adapter-date-fns";
import { enAU } from "date-fns/locale";
import { addWeeks, startOfWeek, lastDayOfWeek } from "date-fns";
import { Spin } from "antd";
import { useQuery } from "graphql-hooks";

import { useUser } from "root/helpers/useUser";

import { GET_TRANSACTIONS_FOR_RANGE } from "./queries";

const LINE_INDEXES = {
  Total: 0,
  Personal: 1,
  "On Behalf": 2,
};
const LINES = [
  { label: "Total", colour: "#8E562E" },
  { label: "Personal", colour: "#619380" },
  { label: "On Behalf", colour: "#4181C2" },
];
const RANGE_OPTIONS = {
  week: {
    startDate: startOfWeek(new Date()),
    endDate: lastDayOfWeek(new Date()),
  },
  fortnight: {
    startDate: startOfWeek(addWeeks(new Date(), -1)),
    endDate: lastDayOfWeek(new Date()),
  },
  // "MONTH": getDaysInMonth(new Date()),
  // "QUARTER":
};

const amountAsFloat = input =>
  parseFloat(input.replace("$", "").replace(",", ""));

const TotalSpendTrend = () => {
  const [range, setRange] = useState(RANGE_OPTIONS["fortnight"]);
  const userId = useUser();
  const { loading, data: rawData } = useQuery(GET_TRANSACTIONS_FOR_RANGE, {
    variables: {
      userId,
      ...range,
    },
  });
  const canvas = useRef();
  const chart = useRef();

  const data =
    rawData?.transactions
      .map(({ created_at, ...transaction }) => ({
        ...transaction,
        date: new Date(created_at),
      }))
      .reverse() || [];

  const dayGranularity = loading
    ? false
    : (data[data.length - 1].date - data[0].date) / (1000 * 3600 * 24) < 30;

  const chartData = data.reduce(
    (acc, { amount, date, paid_id, splits }) => {
      const getDatapoint = dateData => {
        let datapoint = dateData.find(
          ({ x }) =>
            (!dayGranularity || x.getDate() === date.getDate()) &&
            x.getMonth() === date.getMonth() &&
            x.getFullYear() === date.getFullYear()
        );
        if (!datapoint) {
          datapoint = {
            x: dayGranularity
              ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
              : new Date(date.getFullYear(), date.getMonth()),
            y: dateData.length ? dateData[dateData.length - 1].y : 0,
          };
          dateData.push(datapoint);
        }
        return datapoint;
      };

      const datapoints = acc.datasets.map(({ data: dateData }) =>
        getDatapoint(dateData)
      );

      const rValue = amountAsFloat(amount);

      // We spent this money
      if (paid_id === userId) {
        let personalValue = rValue;
        // Subtract anything associated with other users
        if (splits?.length > 0) {
          splits.forEach(({ percentage }) => {
            personalValue -= (percentage / 100) * rValue;
          });
        }
        // Increment personal and total spend
        datapoints[LINE_INDEXES["Personal"]].y += personalValue;
        datapoints[LINE_INDEXES["Total"]].y += personalValue;
      }
      // This money was spent on our behalf
      else {
        // Get our split
        const ourSplit = splits.find(
          ({ user_id: splitUser }) => userId === splitUser
        );
        const onBehalfValue = (ourSplit.percentage / 100) * rValue;
        // Increment on behalf and total spend
        datapoints[LINE_INDEXES["On Behalf"]].y += onBehalfValue;
        datapoints[LINE_INDEXES["Total"]].y += onBehalfValue;
      }

      return acc;
    },
    {
      datasets: LINES.map(({ label, colour }) => ({
        label,
        data: [],
        fill: false,
        borderColor: colour,
        pointRadius: 0,
      })),
    }
  );

  useEffect(() => {
    if (canvas.current) {
      if (!chart.current) {
        chart.current = new Chart(canvas.current, {
          type: "line",
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              position: "bottom",
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  display: true,
                  adapters: {
                    date: {
                      locale: enAU,
                    },
                  },
                },
              ],
            },
          },
        });
      } else {
        chart.current.data = chartData;
        chart.current.update();
      }
    }
  }, [chartData, canvas]);

  if (loading) {
    return <Spin />;
  }

  return (
    <div style={{ position: "relative", height: "300px", width: "100%" }}>
      <canvas ref={canvas} />
    </div>
  );
};

export { TotalSpendTrend };
