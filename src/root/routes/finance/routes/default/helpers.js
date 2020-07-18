import { head, init, mean, last } from "ramda";
import { addWeeks, isThisWeek, isThisMonth } from "date-fns";

import { getAmountAsFloat } from "../../helpers/getAmountAsFloat";
import { roundTo2Dec } from "../../helpers/roundTo2Dec";

const transformWeeklyToWeekData = ({ spent_by_week }) => {
  const totals = init(
    spent_by_week.map(({ total }) => getAmountAsFloat(total))
  );
  const latest = last(spent_by_week);

  return {
    min: Math.min(...totals),
    max: Math.max(...totals),
    avg: roundTo2Dec(mean(totals)),
    current: isThisWeek(new Date(latest.weekly), { weekStartsOn: 1 })
      ? getAmountAsFloat(latest.total)
      : 0,
  };
};

const transformWeeklyToFortnightData = ({ spent_by_week }) => {
  // Reverse this so we always include the current and previous week.
  const totals = spent_by_week
    .map(({ total }) => getAmountAsFloat(total))
    .reduce((acc, item, index) => {
      if (index % 2) {
        return [...init(acc), last(acc) + item];
      }
      return [...acc, item];
    }, []);
  totals.reverse();

  const latest = last(spent_by_week);

  return {
    min: Math.min(...totals),
    max: Math.max(...totals),
    avg: roundTo2Dec(mean(totals)),
    current:
      isThisWeek(new Date(latest.weekly), { weekStartsOn: 1 }) ||
      isThisWeek(addWeeks(new Date(latest.weekly), 1), { weekStartsOn: 1 })
        ? getAmountAsFloat(head(totals))
        : 0,
  };
};

const transformMonthlyToMonthData = ({ spent_by_month }) => {
  const totals = init(
    spent_by_month.map(({ total }) => getAmountAsFloat(total))
  );
  const latest = last(spent_by_month);

  return {
    min: Math.min(...totals),
    max: Math.max(...totals),
    avg: roundTo2Dec(mean(totals)),
    current: isThisMonth(new Date(latest.monthly))
      ? getAmountAsFloat(latest.total)
      : 0,
  };
};

export {
  transformWeeklyToWeekData,
  transformWeeklyToFortnightData,
  transformMonthlyToMonthData,
};
