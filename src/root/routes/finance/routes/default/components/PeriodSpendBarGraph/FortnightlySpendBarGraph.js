import React, { useContext } from "react";
import { useQuery } from "graphql-hooks";
import { FinanceContext } from "root/routes/finance/FinanceWrapper";
import { format } from "date-fns";

import { GET_SPENT_BY_WEEK } from "../../queries";
import { PeriodSpendBarGraph } from "./PeriodSpendBarGraph";
import { convertWeeklyToFortnightly } from "../../helpers";

const FortnightlySpendBarGraph = () => {
  const {
    dateRange: [startDate],
  } = useContext(FinanceContext);
  const { data: { spent_by_week_nz } = {} } = useQuery(GET_SPENT_BY_WEEK);

  if (!spent_by_week_nz) {
    return null;
  }

  const fortnightlyData = convertWeeklyToFortnightly(spent_by_week_nz);

  return (
    <PeriodSpendBarGraph
      rawData={fortnightlyData.map(({ total, fortnightly }) => ({
        label: fortnightly,
        value: total,
      }))}
      selectedPeriodIndex={fortnightlyData.findIndex(
        ({ fortnightly }) => fortnightly === format(startDate, "yyyy-MM-dd")
      )}
    />
  );
};

export { FortnightlySpendBarGraph };
