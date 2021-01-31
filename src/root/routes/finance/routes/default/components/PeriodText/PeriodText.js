import React, { useContext } from "react";

import { FinanceContext } from "root/routes/finance/FinanceWrapper";
import { CurrentPeriodText } from "./CurrentPeriodText";

const now = new Date();

const PeriodText = () => {
  const {
    dateRange: [startDate, endDate],
  } = useContext(FinanceContext);

  if (startDate < now && endDate > now) {
    return <CurrentPeriodText />;
  }

  return null;
};

export { PeriodText };
