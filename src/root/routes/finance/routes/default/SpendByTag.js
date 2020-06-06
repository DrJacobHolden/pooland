import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import { Spin, Tag } from "antd";
import { useQuery } from "graphql-hooks";

import { GET_SPENT_BY_TAG } from "./queries";

const amountAsFloat = input =>
  parseFloat(input.replace("$", "").replace(",", ""));

const SpendByTag = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const { loading, data: rawData } = useQuery(GET_SPENT_BY_TAG);
  const canvas = useRef();
  const chart = useRef();

  const data = rawData?.spent_by_tag || [];

  const chartData = data
    .filter(({ name }) => selectedTags.indexOf(name) > -1)
    .reduce(
      (acc, { name, total }) => {
        acc.labels.push(name);
        acc.datasets[0].data.push(amountAsFloat(total));
        return acc;
      },
      {
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      }
    );

  useEffect(() => {
    if (rawData?.spent_by_tag) {
      setSelectedTags(data.slice(0, 10).map(({ name }) => name));
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

  const handleTagCheck = (name, checked) =>
    setSelectedTags(
      checked ? [...selectedTags, name] : selectedTags.filter(t => t !== name)
    );

  return (
    <>
      {data.map(({ name }) => (
        <Tag.CheckableTag
          key={name}
          checked={selectedTags.indexOf(name) > -1}
          onChange={checked => handleTagCheck(name, checked)}
        >
          {name}
        </Tag.CheckableTag>
      ))}
      <div style={{ position: "relative", height: "300px", width: "100%" }}>
        <canvas ref={canvas} />
      </div>
    </>
  );
};

export { SpendByTag };
