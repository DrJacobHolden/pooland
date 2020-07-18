import { eachWeekOfInterval, eachMonthOfInterval } from "date-fns";

export const getWeeksInRange = start => {
  return eachWeekOfInterval({ start, end: Date.now() }).length;
};

export const getFortnightsInRange = start => getWeeksInRange(start) / 2;

export const getMonthsInRange = start => {
  return eachMonthOfInterval({ start, end: Date.now() }).length;
};
