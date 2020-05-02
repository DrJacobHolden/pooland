import React from "react";
import { Col, Row, Statistic } from "antd";
import { toPairs } from "ramda";
import { useQuery } from "graphql-hooks";

import { useUser } from "root/helpers/useUser";

import { UserName } from "./UserName";
import { GET_SPENT, GET_OWED } from "./queries";
import { useStyles } from "./StatisticSection.styles";

const getValue = input => parseFloat(input.replace("$", "").replace(",", ""));

const StatisticsSection = () => {
  const userId = useUser();
  const { data: spent } = useQuery(GET_SPENT);
  const { data: owedData } = useQuery(GET_OWED);
  const classes = useStyles();

  if (!owedData || !spent) {
    return null;
  }

  const { owed, onBehalfSpend } = owedData.owed_totals.reduce(
    (acc, { to, amount, owes }) => {
      if (to === userId) {
        // I am owed this money
        acc.owed[owes] = (acc.owed[owes] || 0) + getValue(amount);
      } else {
        // I owe this money
        acc.owed[to] = (acc.owed[to] || 0) - getValue(amount);
        acc.onBehalfSpend += getValue(amount);
      }
      return acc;
    },
    {
      owed: {},
      onBehalfSpend: 0
    }
  );

  const personalSpend = getValue(spent.spent_totals[0].amount);

  return (
    <section className={classes.statisticSection}>
      <Row className={classes.statistic}>
        <Col xs={24} md={8}>
          <Statistic
            title="Lifetime Total Spend"
            precision={2}
            prefix="$"
            value={personalSpend + onBehalfSpend}
          />
        </Col>
        <Col xs={12} md={8}>
          <Statistic
            title="Lifetime Personal Spend"
            precision={2}
            prefix="$"
            value={personalSpend}
          />
        </Col>
        <Col xs={12} md={8}>
          <Statistic
            title="Lifetime On-Behalf Spend"
            precision={2}
            prefix="$"
            value={onBehalfSpend}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ padding: 16 }}>
        {toPairs(owed).map(([owingId, value]) => (
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
  );
};

export { StatisticsSection };
