import React, { createContext, useState } from "react";
import { addWeeks, addMonths, endOfMonth } from "date-fns";

import { GROUP_BY_DEFAULTS } from "./constants";

const FinanceContext = createContext({});

function FinanceWrapper({ children }) {
  const [groupBy, _setGroupBy] = useState("Week");
  const [dateRange, _setDateRange] = useState(GROUP_BY_DEFAULTS[groupBy]);

  const setGroupBy = (selected) => {
    _setGroupBy(selected);
    _setDateRange(GROUP_BY_DEFAULTS[selected]);
  };

  const goBackPeriod = () => {
    switch (groupBy) {
      case "Week":
        _setDateRange(([startDate, endDate]) => [
          addWeeks(startDate, -1),
          addWeeks(endDate, -1),
        ]);
        break;
      case "Fortnight":
        _setDateRange(([startDate, endDate]) => [
          addWeeks(startDate, -2),
          addWeeks(endDate, -2),
        ]);
        break;
      case "Month":
        _setDateRange(([startDate, endDate]) => [
          addMonths(startDate, -1),
          endOfMonth(addMonths(endDate, -1)),
        ]);
        break;
    }
  };

  const goForwardPeriod = () => {
    switch (groupBy) {
      case "Week":
        _setDateRange(([startDate, endDate]) => [
          addWeeks(startDate, 1),
          addWeeks(endDate, 1),
        ]);
        break;
      case "Fortnight":
        _setDateRange(([startDate, endDate]) => [
          addWeeks(startDate, 2),
          addWeeks(endDate, 2),
        ]);
        break;
      case "Month":
        _setDateRange(([startDate, endDate]) => [
          addMonths(startDate, 1),
          endOfMonth(addMonths(endDate, 1)),
        ]);
        break;
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        dateRange,
        groupBy,
        setGroupBy,
        goBackPeriod,
        goForwardPeriod,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export { FinanceContext, FinanceWrapper };
