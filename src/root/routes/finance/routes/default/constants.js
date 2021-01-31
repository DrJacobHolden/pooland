import {
  addWeeks,
  getWeek,
  startOfWeek,
  startOfMonth,
  addMilliseconds,
  addMonths,
} from "date-fns";

const now = new Date();
const startOfThisMonth = startOfMonth(now);
const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });
const startOfLastWeek = addWeeks(startOfThisWeek, -1);
const endOfThisMonth = addMilliseconds(addMonths(startOfThisMonth, 1), -1);
const endOfThisWeek = addMilliseconds(addWeeks(startOfThisWeek, 1), -1);
const endOfNextWeek = addMilliseconds(addWeeks(startOfThisWeek, 2), -1);
const isWeekEven = Boolean(getWeek(startOfThisWeek) % 2);

const GROUP_BY_OPTIONS = ["Week", "Fortnight", "Month"];
const GROUP_BY_DEFAULTS = {
  Week: [startOfThisWeek, endOfThisWeek],
  Fortnight: [
    isWeekEven ? startOfThisWeek : startOfLastWeek,
    isWeekEven ? endOfNextWeek : endOfThisWeek,
  ],
  Month: [startOfThisMonth, endOfThisMonth],
};

export { GROUP_BY_DEFAULTS, GROUP_BY_OPTIONS };
