export const getAmountAsFloat = input =>
  parseFloat(input.replace("$", "").replace(",", ""));
