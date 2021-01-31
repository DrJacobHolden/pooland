import React, { useContext } from "react";
import { useQuery } from "graphql-hooks";
import { format } from "date-fns";

import { FinanceContext } from "root/routes/finance/FinanceWrapper";
import { GET_SPENT_BY_WEEK } from "../../queries";
import { RelativePeriodSpendBar } from "./RelativePeriodSpendBar";
import { convertWeeklyToFortnightly } from "../../helpers";

const FortnightSpendBar = () => {
  const { dateRange } = useContext(FinanceContext);
  const { data } = useQuery(GET_SPENT_BY_WEEK);

  if (!data) {
    return null;
  }

  const fortnightlyData = convertWeeklyToFortnightly(data.spent_by_week_nz);

  const currentIndex = fortnightlyData.findIndex(
    ({ fortnightly }) => fortnightly === format(dateRange[0], "yyyy-MM-dd")
  );
  const totals = fortnightlyData.map(({ total }) => total);

  const current = fortnightlyData[currentIndex]?.total ?? 0;
  const avg = totals.reduce((p, c) => p + c, 0) / totals.length;
  const min = Math.min(...totals);
  const max = Math.max(...totals);

  return (
    <RelativePeriodSpendBar current={current} avg={avg} min={min} max={max} />
  );
};

export { FortnightSpendBar };
