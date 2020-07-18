export const roundTo2Dec = input =>
  Math.round((input + Number.EPSILON) * 100) / 100;
