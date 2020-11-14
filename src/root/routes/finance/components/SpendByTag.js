import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Chart from "chart.js";
import { Spin, Tag } from "antd";

import { getAmountAsFloat } from "../helpers/getAmountAsFloat";

const COLOURS = [
  [255, 99, 132],
  [255, 159, 64],
  [255, 205, 86],
  [75, 192, 192],
  [54, 162, 235],
  [153, 102, 255],
  [201, 203, 207],
];

const SpendByTag = ({ rawData }) => {
  const { push } = useHistory();
  const [selectedTags, setSelectedTags] = useState([]);
  const canvas = useRef();
  const chart = useRef();

  const chartData = rawData
    .filter(({ name }) => selectedTags.indexOf(name) > -1)
    .reduce(
      (acc, { name, total }, index) => {
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

  const barClicked = (_, [chartElement]) => {
    if (chartElement && chartElement._model?.label) {
      push(`/finance/reports/tag/${chartElement._model.label}`);
    }
  };

  useEffect(() => {
    if (rawData) {
      setSelectedTags(rawData.slice(0, 10).map(({ name }) => name));
    }
  }, [rawData]);

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
            onClick: barClicked,
          },
        });
      } else {
        chart.current.data = chartData;
        chart.current.update();
      }
    }
  }, [chartData, canvas]);

  if (!rawData) {
    return <Spin />;
  }

  const handleTagCheck = (name, checked) =>
    setSelectedTags(
      checked ? [...selectedTags, name] : selectedTags.filter(t => t !== name)
    );

  return (
    <div>
      <div style={{ position: "relative", height: "300px", width: "100%" }}>
        <canvas ref={canvas} />
      </div>
      {rawData.map(({ name }) => (
        <Tag.CheckableTag
          key={name}
          checked={selectedTags.indexOf(name) > -1}
          onChange={checked => handleTagCheck(name, checked)}
        >
          {name}
        </Tag.CheckableTag>
      ))}
    </div>
  );
};

export { SpendByTag };
