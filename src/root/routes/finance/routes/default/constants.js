import {
  addMonths,
  addWeeks,
  startOfWeek,
  startOfMonth,
  addHours,
} from "date-fns";

import {
  GET_SPENT_BY_WEEK,
  GET_SPENT_BY_MONTH,
  GET_MOST_RECENT_WEEK,
  GET_MOST_RECENT_FORTNIGHT,
  GET_MOST_RECENT_MONTH,
} from "./queries";
import {
  transformWeeklyToWeekData,
  transformWeeklyToFortnightData,
  transformMonthlyToMonthData,
} from "./helpers";

const now = new Date();

const doctoredStartOfWeek = date =>
  addHours(startOfWeek(date, { weekStartsOn: 1 }), 12);

const PERIOD_OPTIONS = {
  "This Week": {
    period: {
      startDate: doctoredStartOfWeek(now, { weekStartsOn: 1 }),
      endDate: doctoredStartOfWeek(addWeeks(now, 1), { weekStartsOn: 1 }),
    },
    barQuery: GET_SPENT_BY_WEEK,
    textQuery: GET_MOST_RECENT_WEEK,
    transformation: transformWeeklyToWeekData,
    name: "week",
  },
  "This Fortnight": {
    period: {
      startDate: doctoredStartOfWeek(addWeeks(now, -1), { weekStartsOn: 1 }),
      endDate: doctoredStartOfWeek(addWeeks(now, 1), { weekStartsOn: 1 }),
    },
    barQuery: GET_SPENT_BY_WEEK,
    textQuery: GET_MOST_RECENT_FORTNIGHT,
    transformation: transformWeeklyToFortnightData,
    name: "fortnight",
  },
  "This Month": {
    period: {
      startDate: addHours(startOfMonth(now), 12),
      endDate: addHours(startOfMonth(addMonths(now, 1)), 12),
    },
    barQuery: GET_SPENT_BY_MONTH,
    textQuery: GET_MOST_RECENT_MONTH,
    transformation: transformMonthlyToMonthData,
    name: "month",
  },
  Lifetime: null,
};

export { PERIOD_OPTIONS };
