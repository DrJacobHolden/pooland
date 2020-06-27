export const getAmountAsFloat = input => {
  try {
    return parseFloat(input.replace("$", "").replace(",", ""));
  } catch (e) {
    return input;
  }
};
