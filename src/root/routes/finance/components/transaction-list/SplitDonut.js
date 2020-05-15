import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import { range } from "ramda";

const amountAsFloat = input =>
  parseFloat(input.replace("$", "").replace(",", ""));

function SplitDonut({ amount, splits }) {
  const canvas = useRef();
  const chart = useRef();
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    const you = splits.reduce((acc, { percentage }) => acc - percentage, 100);
    const data = {
      datasets: [
        {
          data: [you, ...splits.map(({ percentage }) => percentage)],
          backgroundColor: [
            ...range(0, selectedIndex + 1 || 0).map(() => undefined),
            "#619380",
          ],
        },
      ],
      labels: ["You", ...splits.map(({ user }) => user.name)],
    };

    if (canvas.current) {
      if (!chart.current) {
        chart.current = new Chart(canvas.current, {
          type: "doughnut",
          data,
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
        chart.current.data = data;
        chart.current.update();
      }
    }
  }, [amount, canvas, selectedIndex, splits]);

  const handleClick = () => {
    if (selectedIndex !== undefined) {
      if (selectedIndex === splits.length - 1) {
        setSelectedIndex(undefined);
      } else {
        setSelectedIndex(selectedIndex + 1);
      }
    } else {
      setSelectedIndex(0);
    }
  };

  const getAmountForIndex = index => {
    const { percentage } = splits[index];
    return amountAsFloat(amount) * (percentage / 100);
  };
  const youAmount =
    amountAsFloat(amount) -
    splits.reduce((acc, _, index) => {
      acc += getAmountForIndex(index);
      return acc;
    }, 0);

  const displayedAmount = Math.floor(
    selectedIndex !== undefined ? getAmountForIndex(selectedIndex) : youAmount
  );

  return (
    <div
      onClick={splits.length > 0 ? handleClick : undefined}
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        cursor: splits.length > 0 ? "pointer" : "unset",
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
        ${displayedAmount}
      </div>
      <canvas ref={canvas} />
    </div>
  );
}

export { SplitDonut };
