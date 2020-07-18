import React from "react";
import { Col, Row, Statistic } from "antd";
import { Link } from "react-router-dom";
import { toPairs } from "ramda";
import { useQuery } from "graphql-hooks";

import { useUser } from "root/helpers/useUser";

import { UserName } from "../../../components/UserName";
import { GET_SPENT, GET_OWED } from "../queries";
import { useStyles } from "./LifetimeStatistics.styles";
import { getAmountAsFloat } from "root/routes/finance/helpers/getAmountAsFloat";

const LifetimeStatistics = () => {
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
        acc.owed[owes] = (acc.owed[owes] || 0) + getAmountAsFloat(amount);
      } else {
        // I owe this money
        acc.owed[to] = (acc.owed[to] || 0) - getAmountAsFloat(amount);
        acc.onBehalfSpend += getAmountAsFloat(amount);
      }
      return acc;
    },
    {
      owed: {},
      onBehalfSpend: 0,
    }
  );

  const personalSpend = getAmountAsFloat(
    spent.spent_totals[0]?.amount || "$0.00"
  );
  const totalSpend = personalSpend + onBehalfSpend;

  return (
    <section className={classes.statisticSection}>
      <Row className={classes.statistic}>
        <Col xs={8} md={8}>
          <Statistic
            title="Total Spend"
            precision={2}
            prefix="$"
            value={totalSpend}
          />
        </Col>
        <Col xs={8} md={8}>
          <Statistic
            title="Personal Spend"
            precision={2}
            prefix="$"
            value={personalSpend}
          />
        </Col>
        <Col xs={8} md={8}>
          <Statistic
            title="On-Behalf Spend"
            precision={2}
            prefix="$"
            value={onBehalfSpend}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ padding: 16 }}>
        {toPairs(owed).map(([owingId, value]) => (
          <Col key={owingId}>
            <Link to={`/finance/reports/user/${owingId}`}>
              <Statistic
                className={classes.statistic}
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
                precision={0}
                prefix="$"
                value={Math.abs(value)}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export { LifetimeStatistics };
