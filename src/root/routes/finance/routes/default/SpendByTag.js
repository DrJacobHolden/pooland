import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import { Spin, Tag } from "antd";
import { useManualQuery } from "graphql-hooks";

import { GET_SPENT_BY_TAG, GET_TRANSACTIONS_FOR_RANGE } from "./queries";
import { useUser } from "root/helpers/useUser";
import { getTagSpendForTransactionList } from "../../helpers/transaction";
import { getAmountAsFloat } from "../../helpers/getAmountAsFloat";

const COLOURS = [
  [255, 99, 132],
  [255, 159, 64],
  [255, 205, 86],
  [75, 192, 192],
  [54, 162, 235],
  [153, 102, 255],
  [201, 203, 207],
];

const SpendByTag = ({ period }) => {
  const userId = useUser();
  const [rawData, setRawData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [getLifetimeData] = useManualQuery(GET_SPENT_BY_TAG);
  const [getPeriodData] = useManualQuery(GET_TRANSACTIONS_FOR_RANGE, {
    variables: {
      ...period?.period,
    },
  });
  const canvas = useRef();
  const chart = useRef();

  useEffect(() => {
    setRawData([]);
    (async () => {
      if (period) {
        const { transactions } = (await getPeriodData()).data;
        setRawData(
          Object.values(
            getTagSpendForTransactionList(userId, transactions)
          ).sort((a, b) => b.total - a.total)
        );
      } else {
        setRawData((await getLifetimeData()).data.spent_by_tag);
      }
    })();
  }, [period]);

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
    <>
      {rawData.map(({ name }) => (
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
