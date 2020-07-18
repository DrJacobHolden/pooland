import {
  addMonths,
  addWeeks,
  startOfWeek,
  startOfMonth,
  addHours,
} from "date-fns";

import { GET_SPENT_BY_WEEK, GET_SPENT_BY_MONTH } from "./queries";
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
    query: GET_SPENT_BY_WEEK,
    transformation: transformWeeklyToWeekData,
  },
  "This Fortnight": {
    period: {
      startDate: doctoredStartOfWeek(addWeeks(now, -1), { weekStartsOn: 1 }),
      endDate: doctoredStartOfWeek(addWeeks(now, 1), { weekStartsOn: 1 }),
    },
    query: GET_SPENT_BY_WEEK,
    transformation: transformWeeklyToFortnightData,
  },
  "This Month": {
    period: {
      startDate: addHours(startOfMonth(now), 12),
      endDate: addHours(startOfMonth(addMonths(now, 1)), 12),
    },
    query: GET_SPENT_BY_MONTH,
    transformation: transformMonthlyToMonthData,
  },
  Lifetime: null,
};

export { PERIOD_OPTIONS };
