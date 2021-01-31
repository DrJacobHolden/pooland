import React, { useContext } from "react";
import { useQuery } from "graphql-hooks";
import { format } from "date-fns";
import { FinanceContext } from "root/routes/finance/FinanceWrapper";
import { GET_RELATIVE_SPEND_BAR_DATA_MONTH } from "../../queries";
import { RelativePeriodSpendBar } from "./RelativePeriodSpendBar";

const MonthSpendBar = () => {
  const { dateRange } = useContext(FinanceContext);
  const { data } = useQuery(GET_RELATIVE_SPEND_BAR_DATA_MONTH, {
    variables: {
      month: format(dateRange[0], "yyyy-MM-dd"),
    },
  });

  if (!data) {
    return null;
  }

  const current = data.spent_by_month_nz[0]?.total ?? 0;
  const avg = data.spent_by_month_nz_aggregate.aggregate.avg.total;
  const min = data.spent_by_month_nz_aggregate.aggregate.min.total;
  const max = data.spent_by_month_nz_aggregate.aggregate.max.total;

  return (
    <RelativePeriodSpendBar current={current} avg={avg} min={min} max={max} />
  );
};

export { MonthSpendBar };
