import React from "react";
import { Statistic, Spin } from "antd";
import { toPairs } from "ramda";
import { useQuery } from "graphql-hooks";

import { useUser } from "root/helpers/useUser";

import { TransactionList } from "../../components/TransactionList";
import { UserName } from "../../components/UserName";
import { GET_SPENT, GET_OWED } from "./queries";

const getValue = input => parseFloat(input.replace("$", "").replace(",", ""));

const Finance = () => {
  const userId = useUser();
  const { data: spent } = useQuery(GET_SPENT);
  const { data: owedData } = useQuery(GET_OWED);

  // eslint-disable-next-line camelcase
  const owed = owedData?.owed_totals.reduce((acc, { to, amount, owes }) => {
    if (to === userId) {
      // I am owed this money
      acc[owes] = (acc[owes] || 0) + getValue(amount);
    } else {
      // I owe this money
      acc[to] = (acc[to] || 0) - getValue(amount);
    }
    return acc;
  }, {});

  return (
    <div>
      <header
        style={{ display: "flex", backgroundColor: "#8E562E", height: 100 }}
      >
        <h1 style={{ margin: "auto" }}>Finance Dashboard</h1>
      </header>
      <section>
        {spent && (
          <Statistic
            title="Lifetime Spend"
            precision={2}
            prefix="$"
            value={getValue(spent.spent_totals[0].amount)}
          />
        )}
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
