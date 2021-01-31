import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const COLOURS = [
  [255, 99, 132],
  [255, 159, 64],
  [255, 205, 86],
  [75, 192, 192],
  [54, 162, 235],
  [153, 102, 255],
  [201, 203, 207],
];

const PeriodSpendBarGraph = ({ selectedPeriodIndex, rawData = [] }) => {
  const canvas = useRef();

  const chartData = rawData.reduce(
    (acc, { label, value }, index) => {
      acc.labels.push(label);
      acc.datasets[0].data.push(value);
      acc.datasets[0].backgroundColor.push(
        selectedPeriodIndex === index
          ? "white"
          : `rgba(${COLOURS[index % COLOURS.length].join(",")}, 0.2)`
      );
      acc.datasets[0].borderColor.push(
        selectedPeriodIndex === index
          ? "black"
          : `rgb(${COLOURS[index % COLOURS.length].join(",")})`
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
    let chart;
    if (canvas.current) {
      chart = new Chart(canvas.current, {
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
    }
    return () => chart && chart.destroy();
  }, [chartData, canvas]);

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ position: "relative", height: "300px", width: "100%" }}>
        <canvas ref={canvas} />
      </div>
    </div>
  );
};

export { PeriodSpendBarGraph };
