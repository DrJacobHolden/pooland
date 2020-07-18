import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import { Spin } from "antd";
import { useQuery } from "graphql-hooks";

import { getAmountAsFloat } from "../../../helpers/getAmountAsFloat";

const COLOURS = [
  [255, 99, 132],
  [255, 159, 64],
  [255, 205, 86],
  [75, 192, 192],
  [54, 162, 235],
  [153, 102, 255],
  [201, 203, 207],
];

const PeriodSpendBarGraph = ({ period }) => {
  const { data: rawData } = useQuery(period.barQuery);
  const canvas = useRef();
  const chart = useRef();

  const { graphData = [] } = period.transformation(rawData);
  const chartData = graphData.reduce(
    (acc, total, index) => {
      acc.labels.push(name);
      acc.datasets[0].data.push(getAmountAsFloat(total));
      acc.datasets[0].backgroundColor.push(
        `rgba(${COLOURS[index % COLOURS.length].join(",")}, 0.2)`
      );
      acc.datasets[0].borderColor.push(
        `rgb(${COLOURS[index % COLOURS.length].join(",")})`
      );
      return acc;
    },
    {
      labels: [],
      datasets: [
        {
          data: [],
          fill: false,
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    }
  );

  useEffect(() => {
    if (canvas.current) {
      if (!chart.current) {
        chart.current = new Chart(canvas.current, {
          type: "bar",
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
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

  return (
    <div style={{ marginTop: 16 }}>
      <h2 style={{ width: "100%", textAlign: "center" }}>
        Spend per {period.name}
      </h2>
      <div style={{ position: "relative", height: "300px", width: "100%" }}>
        <canvas ref={canvas} />
      </div>
    </div>
  );
};

export { PeriodSpendBarGraph };
