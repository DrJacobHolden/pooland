import React, { createContext, useState } from "react";
import { DEFAULT_PERIOD, PERIOD_OPTIONS } from "./constants";

const FinanceContext = createContext({});

function FinanceWrapper({ children }) {
  const [period, setPeriod] = useState(PERIOD_OPTIONS[DEFAULT_PERIOD]);

  return (
    <FinanceContext.Provider
      value={{
        period,
        setPeriod,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export { FinanceContext, FinanceWrapper };
