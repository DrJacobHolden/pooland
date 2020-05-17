import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import "chartjs-adapter-date-fns";
import { enAU } from "date-fns/locale";
import { UserName } from "root/routes/finance/components/UserName";

const amountAsFloat = input =>
  parseFloat(input.replace("$", "").replace(",", ""));

const SpendTrend = ({ data: rawData, otherUserId }) => {
  const canvas = useRef();
  const chart = useRef();

  const data = rawData.transactions
    .map(({ created_at, ...transaction }) => ({
      ...transaction,
      date: new Date(created_at),
    }))
    .reverse();

  const dayGranularity =
    data.length === 0
      ? false
      : (data[data.length - 1].date - data[0].date) / (1000 * 3600 * 24) < 30;

  const chartData = data.reduce(
    (acc, { amount, date, paid_id, splits }) => {
      const { data: dateData } = acc.datasets[0];

      const getDatapoint = () => {
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

      const datapoint = getDatapoint();
      const value = (splits[0].percentage / 100) * amountAsFloat(amount);
      const difference =
        otherUserId === paid_id
          ? // You owe this money, so it is negative.
            -value
          : // You are owed this money so it is positive
            value;

      datapoint.y += difference;

      return acc;
    },
    {
      datasets: [
        {
          label: "Debt",
          data: [],
          fill: false,
          borderColor: "#4181C2",
          pointRadius: 0,
        },
      ],
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
              display: false,
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

  const dataSetData = chartData.datasets[0].data;
  const finalAmount =
    Math.round((dataSetData[dataSetData.length - 1].y + Number.EPSILON) * 100) /
    100;

  return (
    <>
      <h3>
        Currently {finalAmount > 0 ? "" : "you owe "}
        <UserName userId={otherUserId} /> {finalAmount > 0 ? "owes you " : ""}$
        {Math.abs(finalAmount)}
      </h3>
      <div style={{ position: "relative", height: "300px", width: "100%" }}>
        <canvas ref={canvas} />
      </div>
    </>
  );
};

export { SpendTrend };
