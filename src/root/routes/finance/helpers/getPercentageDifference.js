export const getPercentageDifference = (current, previous) =>
  Math.round(((current - previous) / previous) * 100);
