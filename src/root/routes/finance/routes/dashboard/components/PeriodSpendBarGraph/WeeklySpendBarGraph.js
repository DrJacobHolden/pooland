import React, { useContext } from "react";
import { useQuery } from "graphql-hooks";
import { FinanceContext } from "root/routes/finance/FinanceWrapper";
import { GET_SPENT_BY_WEEK } from "../../queries";
import { PeriodSpendBarGraph } from "./PeriodSpendBarGraph";
import { format } from "date-fns";

const WeeklySpendBarGraph = () => {
  const {
    dateRange: [startDate],
  } = useContext(FinanceContext);
  const { data: { spent_by_week_nz } = {} } = useQuery(GET_SPENT_BY_WEEK);

  if (!spent_by_week_nz) {
    return null;
  }

  return (
    <PeriodSpendBarGraph
      rawData={spent_by_week_nz.map(({ total, weekly }) => ({
        label: weekly,
        value: total,
      }))}
      selectedPeriodIndex={spent_by_week_nz.findIndex(
        ({ weekly }) => weekly === format(startDate, "yyyy-MM-dd")
      )}
    />
  );
};

export { WeeklySpendBarGraph };
