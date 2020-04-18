import React from "react";
import { Statistic } from "antd";
import { pipe, tail, toPairs } from "ramda";
import { useQuery } from "graphql-hooks";
import { useUser } from "root/helpers/useUser";

import { TransactionList } from "../../components/TransactionList";
import { UserName } from "../../components/UserName";
import { GET_WEEKLY_STATS } from "./queries";

const amountAsFloat = pipe(tail, parseFloat);

const Finance = () => {
  const userId = useUser();
  const { data } = useQuery(GET_WEEKLY_STATS);

  const { spent, owed } =
    data?.transactions?.reduce(
      (acc, transaction) => {
        const { amount, splits, paid_id: paidId } = transaction;
        const totalValue = amountAsFloat(amount);

        // If you paid for this transaction
        if (paidId === userId) {
          let remainingValue = totalValue;

          if (splits.length > 0) {
            // Remove the amounts that you are owed
            splits.forEach(({ user_id: owingId, percentage }) => {
              const value = totalValue * (percentage / 100);
              if (acc.owed[owingId]) {
                acc.owed[owingId] += value;
              } else {
                acc.owed[owingId] = value;
              }
              remainingValue -= value;
            });
          }
          // Add the amount left to the total
          acc.spent += remainingValue;
        } else {
          // If this isn't our transaction we can only see our split
          const { percentage } = splits[0];
          const value = totalValue * (percentage / 100);

          // Adjust the amount owed to us by the amount we owe.
          if (acc.owed[paidId]) {
            acc.owed[paidId] -= value;
          } else {
            acc.owed[paidId] = -value;
          }
        }
        return acc;
      },
      {
        spent: 0,
        owed: {}
      }
    ) || {};

  return (
    <div>
      <header
        style={{ display: "flex", backgroundColor: "#8E562E", height: 100 }}
      >
        <h1 style={{ margin: "auto" }}>Finance Dashboard</h1>
      </header>
      <section>
        <Statistic
          title="Weekly Spend"
          precision={2}
          prefix="$"
          value={spent}
        />
        {owed &&
          toPairs(owed).map(([owingId, value]) => (
            <Statistic
              key={owingId}
              title={
                value > 0 ? (
                  <span>
                    <UserName userId={owingId} /> owes you
                  </span>
                ) : (
                  <span>
                    You owe <UserName userId={owingId} />
                  </span>
                )
              }
              precision={2}
              prefix="$"
              value={Math.abs(value)}
            />
          ))}
      </section>
      <section>
        <TransactionList />
      </section>
    </div>
  );
};

export { Finance };
