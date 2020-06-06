import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js";
import { range } from "ramda";
import { useQuery } from "graphql-hooks";

import { GET_DONUT_DATA } from "./queries";
import { useUser } from "root/helpers/useUser";

const amountAsFloat = input =>
  parseFloat(input.replace("$", "").replace(",", ""));

function SplitDonut({ transactionId }) {
  const userId = useUser();
  const { data } = useQuery(GET_DONUT_DATA, { variables: { transactionId } });
  const canvas = useRef();
  const chart = useRef();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { splits, paid_id, amount, owner } = data?.transactions[0] || {
    amount: "0",
    owner: {
      name: "",
    },
    splits: [],
  };

  const totalSplits = useMemo(() => {
    const remainder = splits.reduce(
      (acc, { percentage }) => acc - percentage,
      100
    );

    // Convert the main amount into a split
    const fakeSplit = { percentage: remainder, user_id: paid_id, user: owner };
    const allSplits = [fakeSplit, ...splits];

    if (paid_id === userId) {
      return allSplits;
    }

    return allSplits.sort((a, b) => {
      if (a.user_id === userId) {
        return -1;
      }
      if (b.user_id === userId) {
        return 1;
      }
      return 0;
    });
  }, [data, userId]);

  const chartData = {
    datasets: [
      {
        data: totalSplits.map(({ percentage }) => percentage),
        backgroundColor: [
          ...range(0, selectedIndex).map(() => undefined),
          "#619380",
        ],
      },
    ],
    labels: totalSplits.map(({ user }) => user.name),
  };

  useEffect(() => {
    if (canvas.current) {
      if (!chart.current) {
        chart.current = new Chart(canvas.current, {
          type: "doughnut",
          data: chartData,
          options: {
            cutoutPercentage: 75,
            responsive: true,
            legend: {
              display: false,
            },
            tooltips: {
              display: false,
            },
          },
        });
      } else {
        chart.current.data = chartData;
        chart.current.update();
      }
    }
  }, [canvas, chartData]);

  const handleClick = () => {
    if (selectedIndex === totalSplits.length - 1) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const getAmountForIndex = index => {
    const { percentage } = totalSplits[index];
    return Math.round(amountAsFloat(amount) * (percentage / 100));
  };

  return (
    <div
      onClick={totalSplits.length > 0 ? handleClick : undefined}
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        cursor: totalSplits.length > 0 ? "pointer" : "unset",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 12,
        }}
      >
        ${getAmountForIndex(selectedIndex)}
      </div>
      <canvas ref={canvas} />
    </div>
  );
}

export { SplitDonut };
