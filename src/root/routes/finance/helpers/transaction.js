import { getAmountAsFloat } from "./getAmountAsFloat";

export const partitionTransactionAmount = (
  userId,
  { amount, paid_id, splits }
) => {
  const amountAsFloat = getAmountAsFloat(amount);
  let personal = 0;
  let onBehalf = 0;
  let byUser = {};

  if (splits.length === 0) {
    personal += amountAsFloat; // partitionTransactionAmount
  } else {
    if (paid_id === userId) {
      personal += splits.reduce((yourTotal, { user_id, percentage }) => {
        const theyOwe = amountAsFloat * (percentage / 100);
        if (!byUser[user_id]) {
          byUser[user_id] = 0;
        }
        byUser[user_id] += theyOwe;
        return yourTotal - theyOwe;
      }, amountAsFloat);
    } else {
      const youOwe =
        amountAsFloat *
        (splits.find(({ user_id }) => user_id === userId).percentage / 100);
      onBehalf += youOwe;
      if (!byUser[paid_id]) {
        byUser[paid_id] = 0;
      }
      byUser[paid_id] -= youOwe;
    }
  }

  return { personal, onBehalf, byUser };
};

export const partitionTransactionList = (userId, transactionList) =>
  transactionList.reduce(
    (acc, transaction) => {
      const { personal, onBehalf, byUser } = partitionTransactionAmount(
        userId,
        transaction
      );

      acc.personal += personal;
      acc.onBehalf += onBehalf;
      Object.keys(byUser).forEach(user => {
        if (!acc.byUser[user]) {
          acc.byUser[user] = byUser[user];
        } else {
          acc.byUser[user] += byUser[user];
        }
      });
      return acc;
    },
    {
      personal: 0,
      onBehalf: 0,
      byUser: {},
    }
  );

export const getTagSpendForTransactionList = (userId, transactionList) =>
  transactionList.reduce((acc, { tags, ...transaction }) => {
    const { personal, onBehalf } = partitionTransactionAmount(
      userId,
      transaction
    );
    const amount = Math.round(personal + onBehalf);
    tags.forEach(({ name }) => {
      if (!acc[name]) {
        acc[name] = {
          total: 0,
          name: name,
        };
      }
      acc[name].total += amount;
    });

    return acc;
  }, {});
