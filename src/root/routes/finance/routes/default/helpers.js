import { head, init, mean, last, reverse, tail } from "ramda";
import { addWeeks, isThisWeek, isThisMonth } from "date-fns";

import { getAmountAsFloat } from "../../helpers/getAmountAsFloat";

const DEFAULT = {
  min: 0,
  max: 0,
  avg: 0,
  current: 0,
};

const transformWeeklyToWeekData = ({ spent_by_week } = {}) => {
  if (!spent_by_week) {
    return DEFAULT;
  }
  const totals = spent_by_week.map(({ total }) => getAmountAsFloat(total));
  const totalsDropFirstAndLast = tail(init(totals));
  const latest = last(spent_by_week);

  return {
    min: Math.min(...totalsDropFirstAndLast),
    max: Math.max(...totalsDropFirstAndLast),
    avg: mean(totalsDropFirstAndLast),
    current: isThisWeek(new Date(latest.weekly), { weekStartsOn: 1 })
      ? getAmountAsFloat(latest.total)
      : 0,
    graphData: totals,
  };
};

const transformWeeklyToFortnightData = ({ spent_by_week } = {}) => {
  if (!spent_by_week) {
    return DEFAULT;
  }
  // Reverse this so we always include the current and previous week.
  const totals = reverse(
    spent_by_week.map(({ total }) => getAmountAsFloat(total))
  ).reduce((acc, item, index) => {
    if (index % 2) {
      return [...init(acc), last(acc) + item];
    }
    return [...acc, item];
  }, []);

  const totalsDropFirstAndLast = tail(init(totals));
  const latest = last(spent_by_week);

  return {
    min: Math.min(...totalsDropFirstAndLast),
    max: Math.max(...totalsDropFirstAndLast),
    avg: mean(totalsDropFirstAndLast),
    current:
      isThisWeek(new Date(latest.weekly), { weekStartsOn: 1 }) ||
      isThisWeek(addWeeks(new Date(latest.weekly), 1), { weekStartsOn: 1 })
        ? getAmountAsFloat(head(totals))
        : 0,
    graphData: reverse(totals),
  };
};

const transformMonthlyToMonthData = ({ spent_by_month } = {}) => {
  if (!spent_by_month) {
    return DEFAULT;
  }
  const totals = spent_by_month.map(({ total }) => getAmountAsFloat(total));
  const totalsDropFirstAndLast = tail(init(totals));
  const latest = last(spent_by_month);

  return {
    min: Math.min(...totalsDropFirstAndLast),
    max: Math.max(...totalsDropFirstAndLast),
    avg: mean(totalsDropFirstAndLast),
    current: isThisMonth(new Date(latest.monthly))
      ? getAmountAsFloat(latest.total)
      : 0,
    graphData: totals,
  };
};

export {
  transformWeeklyToWeekData,
  transformWeeklyToFortnightData,
  transformMonthlyToMonthData,
};
