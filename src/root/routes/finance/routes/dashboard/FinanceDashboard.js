import React, { useContext } from "react";

import { FinanceContext } from "../../FinanceWrapper";
import { PeriodText } from "./components/PeriodText/PeriodText";
import { WeekSpendBar } from "./components/RelativePeriodSpendBar/WeekSpendBar";
import { FortnightSpendBar } from "./components/RelativePeriodSpendBar/FortnightSpendBar";
import { MonthSpendBar } from "./components/RelativePeriodSpendBar/MonthSpendBar";
import { SpendByTag } from "./components/SpendByTag";
import { WeeklySpendBarGraph } from "./components/PeriodSpendBarGraph/WeeklySpendBarGraph";
import { FortnightlySpendBarGraph } from "./components/PeriodSpendBarGraph/FortnightlySpendBarGraph";
import { MonthlySpendBarGraph } from "./components/PeriodSpendBarGraph/MonthlySpendBarGraph";
import { DebtDisplay } from "./components/DebtDisplay/DebtDisplay";
import { FinancePage } from "../../components/FinancePage";
import { PeriodSelect } from "../../components/PeriodSelect";
import { LandingTabs } from "../../components/LandingTabs";

const FinanceDashboard = () => {
  const { groupBy } = useContext(FinanceContext);

  return (
    <FinancePage title={<h1>Finance Dashboard</h1>}>
      <PeriodSelect />
      <LandingTabs />
      <div
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <DebtDisplay />
        <PeriodText />
        {groupBy === "Week" && <WeekSpendBar />}
        {groupBy === "Fortnight" && <FortnightSpendBar />}
        {groupBy === "Month" && <MonthSpendBar />}
        <SpendByTag />
        {groupBy === "Week" && <WeeklySpendBarGraph />}
        {groupBy === "Fortnight" && <FortnightlySpendBarGraph />}
        {groupBy === "Month" && <MonthlySpendBarGraph />}
      </div>
    </FinancePage>
  );
};

export { FinanceDashboard };
