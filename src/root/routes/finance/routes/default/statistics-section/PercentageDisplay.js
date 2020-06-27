import React from "react";

import { getPercentageDifference } from "root/routes/finance/helpers/getPercentageDifference";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";

export const PercentageDisplay = ({ current, previous }) => {
  const diff = getPercentageDifference(current, previous);

  if (isNaN(diff) || diff === Infinity) {
    return null;
  }

  return (
    <>
      ({diff > 0 && <CaretUpFilled style={{ color: "red" }} />}
      {diff < 0 && <CaretDownFilled style={{ color: "green" }} />}
      {Math.abs(diff)}%)
    </>
  );
};
