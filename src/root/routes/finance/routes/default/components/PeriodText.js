import React from "react";
import { useQuery } from "graphql-hooks";
import {
  formatDistance,
  isThisWeek,
  addWeeks,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  startOfMonth,
  isThisMonth,
} from "date-fns";

import { GET_SPENT, GET_OWED } from "../queries";
import { getAmountAsFloat } from "root/routes/finance/helpers/getAmountAsFloat";
import { useUser } from "root/helpers/useUser";

const PeriodText = ({ period }) => {
  return period ? <DefinedPeriodText period={period} /> : <LifetimeText />;
};

const DefinedPeriodText = ({ period }) => {
  const { data } = useQuery(period.textQuery);

  if (!data) {
    return null;
  }

  const periodData = Object.keys(data)
    .map(key => data[key])
    .flat()
    .map(item => ({
      ...item,
      total: getAmountAsFloat(item.total),
    }));

  const { periodPredict, yearPredict, percentage } = transformPeriodData(
    periodData
  );

  return (
    <>
      <p>
        You are <strong>{percentage}%</strong> of the way through the{" "}
        {period.name}.
      </p>
      <p>
        You are on track to spend <strong>${periodPredict}</strong> this{" "}
        {period.name}.
      </p>
      <p>
        If you spent this much every {period.name}, you would spend{" "}
        <strong>${yearPredict}</strong> in the year.
      </p>
    </>
  );
};

const LifetimeText = () => {
  const userId = useUser();
  const earliestDate = useEarliestDate();
  const { data: spent } = useQuery(GET_SPENT);
  const { data: owedData } = useQuery(GET_OWED);

  if (!owedData || !spent || !earliestDate) {
    return null;
  }

  const onBehalfSpend = owedData.owed_totals.reduce((acc, { to, amount }) => {
    if (to !== userId) {
      acc += getAmountAsFloat(amount);
    }
    return acc;
  }, 0);
  const personalSpend = getAmountAsFloat(
    spent.spent_totals[0]?.amount || "$0.00"
  );

  const totalSpend = Math.round(personalSpend + onBehalfSpend);
  const perYear = Math.round(
    totalSpend / ((Date.now() - earliestDate) / 31557600000)
  );

  return (
    <>
      <p>
        You have been using Pooland for{" "}
        <strong>
          {earliestDate ? formatDistance(new Date(), earliestDate) : ""}
        </strong>
        .
      </p>
      <p>
        In that time, you have spent <strong>${totalSpend}</strong>.
      </p>
      <p>
        That&apos;s about <strong>${perYear}</strong> per year.
      </p>
    </>
  );
};

const useEarliestDate = () => {
  const { data: rangeData } = useQuery(`query getTransactions {
    transactions(
      order_by: { created_at: asc },
      limit: 1
    ) {
      created_at
    }
  }`);

  return rangeData ? new Date(rangeData.transactions[0].created_at) : undefined;
};

const transformPeriodData = ([{ total, monthly, weekly }, second]) => {
  const now = Date.now();

  let percentage = 0;
  let spent = 0;
  const isFortnightly = !!second;

  if (monthly && isThisMonth(new Date(monthly))) {
    spent = total;
    percentage =
      (100 * (now - startOfMonth(now))) / (endOfMonth(now) - startOfMonth(now));
  } else {
    const percentOfCurrentWeek =
      (100 * (now - startOfWeek(now, { weekStartsOn: 1 }))) /
      (endOfWeek(now, { weekStartsOn: 1 }) -
        startOfWeek(now, { weekStartsOn: 1 }));

    if (isThisWeek(new Date(weekly), { weekStartsOn: 1 })) {
      percentage = isFortnightly
        ? 50 + percentOfCurrentWeek / 2
        : percentOfCurrentWeek;
      spent = isFortnightly ? total + second.total : total;
    } else if (
      // The most recent week is last week
      isThisWeek(
        addWeeks(new Date(weekly), 1),
        {
          weekStartsOn: 1,
          // And we are displaying fortnightly data
        } && isFortnightly
      )
    ) {
      spent = total;
      percentage = percentOfCurrentWeek / 2;
    }
  }

  const periodPredict = Math.round((100 * spent) / percentage);
  return {
    percentage: Math.round(percentage),
    periodPredict,
    yearPredict: monthly
      ? periodPredict * 12
      : isFortnightly
      ? periodPredict * 26
      : periodPredict * 52,
  };
};

export { PeriodText };
