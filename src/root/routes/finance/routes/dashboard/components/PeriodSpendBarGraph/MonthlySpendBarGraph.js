import React, { useContext } from "react";
import { useQuery } from "graphql-hooks";
import { FinanceContext } from "root/routes/finance/FinanceWrapper";
import { GET_SPENT_BY_MONTH } from "../../queries";
import { PeriodSpendBarGraph } from "./PeriodSpendBarGraph";
import { format } from "date-fns";

const MonthlySpendBarGraph = () => {
  const {
    dateRange: [startDate],
  } = useContext(FinanceContext);
  const { data: { spent_by_month_nz } = {} } = useQuery(GET_SPENT_BY_MONTH);

  if (!spent_by_month_nz) {
    return null;
  }

  return (
    <PeriodSpendBarGraph
      rawData={spent_by_month_nz.map(({ total, monthly }) => ({
        label: monthly.substring(0, 7),
        value: total,
      }))}
      selectedPeriodIndex={spent_by_month_nz.findIndex(
        ({ monthly }) => monthly === format(startDate, "yyyy-MM-dd")
      )}
    />
  );
};

export { MonthlySpendBarGraph };
