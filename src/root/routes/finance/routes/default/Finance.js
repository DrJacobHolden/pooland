import React from "react";
import { Col, Row, Statistic } from "antd";
import { toPairs } from "ramda";
import { useQuery } from "graphql-hooks";

import { useUser } from "root/helpers/useUser";

import { TransactionList } from "../../components/TransactionList";
import { UserName } from "../../components/UserName";
import { GET_SPENT, GET_OWED } from "./queries";
import { useStyles } from "./Finance.styles";

const getValue = input => parseFloat(input.replace("$", "").replace(",", ""));

const Finance = () => {
  const userId = useUser();
  const { data: spent } = useQuery(GET_SPENT);
  const { data: owedData } = useQuery(GET_OWED);
  const classes = useStyles();

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
    <div className={classes.page}>
      <header className={classes.header}>
        <h1>Finance Dashboard</h1>
      </header>
      <section className={classes.statisticSection}>
        {spent && (
          <Statistic
            className={classes.statistic}
            title="Lifetime Spend"
            precision={2}
            prefix="$"
            value={getValue(spent.spent_totals[0].amount)}
          />
        )}
        <Row gutter={16} style={{ padding: 16 }}>
          {owed &&
            toPairs(owed).map(([owingId, value]) => (
              <Col>
                <Statistic
                  className={classes.statistic}
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
              </Col>
            ))}
        </Row>
      </section>
      <section className={classes.listSection}>
        <TransactionList />
      </section>
    </div>
  );
};

export { Finance };
