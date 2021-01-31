import React, { useContext } from "react";
import { useQuery } from "graphql-hooks";

import { GET_SPENT_FOR_PERIOD } from "../../queries";
import { FinanceContext } from "root/routes/finance/FinanceWrapper";

const now = new Date();
const YEAR_IN_MS = 31557600000;

const CurrentPeriodText = () => {
  const { dateRange, groupBy } = useContext(FinanceContext);
  const [startDate, endDate] = dateRange;
  const groupName = groupBy.toLowerCase();
  const { data } = useQuery(GET_SPENT_FOR_PERIOD, {
    variables: {
      startDate,
      endDate,
    },
  });

  if (!data) {
    return null;
  }

  const spent = data.spent_by_transaction_aggregate.aggregate.sum.total_numeric;
  const totalPeriodDistance = endDate - startDate;
  const periodPassed = now - startDate;
  const periodPercent = periodPassed / totalPeriodDistance;
  const periodPercentOfYear = totalPeriodDistance / YEAR_IN_MS;
  const predictedSpend = spent / periodPercent;

  return (
    <>
      <p>
        You are <strong>{Math.floor(periodPercent * 100)}%</strong> of the way
        through the {groupName}.
      </p>
      <p>
        You are on track to spend <strong>${Math.floor(predictedSpend)}</strong>{" "}
        this {groupName}.
      </p>
      <p>
        If you spent this much every {groupName}, you would spend{" "}
        <strong>${Math.floor(predictedSpend / periodPercentOfYear)}</strong> in
        the year.
      </p>
    </>
  );
};

export { CurrentPeriodText };
