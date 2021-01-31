import { getWeek, format, addWeeks } from "date-fns";

const convertWeeklyToFortnightly = input =>
  input.reduce((acc, { total, weekly }) => {
    const week = new Date(weekly);
    if (getWeek(week) % 2) {
      acc.push({
        fortnightly: weekly,
        total,
      });
    } else {
      const prevWeek = format(addWeeks(week, -1), "yyyy-MM-dd");
      if (acc[acc.length - 1]?.fortnightly === prevWeek) {
        acc[acc.length - 1].total += total;
      } else {
        acc.push({
          fortnightly: prevWeek,
          total,
        });
      }
    }
    return acc;
  }, []);

export { convertWeeklyToFortnightly };
