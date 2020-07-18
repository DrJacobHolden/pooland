import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "graphql-hooks";

const RelativePeriodSpendBar = ({ period }) => {
  const ref = useRef();
  const { data } = useQuery(period.query);
  const [periodData, setPeriodData] = useState();

  useEffect(() => {
    if (data) {
      try {
        setPeriodData(period.transformation(data));
      } catch (e) {
        console.error(e);
      }
    }
  }, [data, period]);

  if (!periodData) {
    return null;
  }

  const { min, max, avg, current } = periodData;

  return (
    <div
      style={{
        marginTop: "-26px",
        padding: "44px 24px 56px",
        position: "relative",
      }}
    >
      <div
        ref={ref}
        style={{
          width: "100%",
          height: 40,
          background: "white",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(current / max) * 100}%`,
            backgroundColor: "green",
          }}
        />
        <span style={{ margin: "auto 0 auto 4px", fontWeight: "bold" }}>
          ${current}
        </span>
      </div>
      {min > 0 && (
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            left: `${(min / max) * 100}%`,
            top: 44,
            transform: "translateX(-50%)",
          }}
        >
          <div
            style={{
              width: 2,
              height: 40,
              background: "black",
              margin: "auto",
            }}
          />
          <div>Minimum</div>
          <div>${min}</div>
        </div>
      )}
      <div
        style={{
          textAlign: "center",
          position: "absolute",
          left: `${(avg / max) * 100}%`,
          top: 0,
          transform: "translateX(-50%)",
        }}
      >
        <div>Average</div>
        <div>${avg}</div>
        <div
          style={{
            width: 2,
            height: 40,
            background: "black",
            margin: "auto",
          }}
        />
      </div>
      {max > current && (
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            right: 0,
            top: 44,
            transform: "translateX(-50%)",
          }}
        >
          <div
            style={{
              width: 2,
              height: 40,
              background: "black",
              margin: "auto",
            }}
          />
          <div>Highest</div>
          <div>${max}</div>
        </div>
      )}
    </div>
  );
};

export { RelativePeriodSpendBar };
