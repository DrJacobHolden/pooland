import React from "react";
import { Col, Row, Statistic } from "antd";
import { Link } from "react-router-dom";
import { toPairs } from "ramda";
import { useQuery } from "graphql-hooks";

import { useUser } from "root/helpers/useUser";

import { UserName } from "../../../components/UserName";
import { GET_OWED } from "../queries";
import { useStyles } from "./LifetimeStatistics.styles";
import { getAmountAsFloat } from "root/routes/finance/helpers/getAmountAsFloat";

const LifetimeStatistics = () => {
  const userId = useUser();
  const { data: owedData } = useQuery(GET_OWED);
  const classes = useStyles();

  if (!owedData) {
    return null;
  }

  const owed = owedData.owed_totals.reduce((acc, { to, amount, owes }) => {
    if (to === userId) {
      // I am owed this money
      acc[owes] = (acc[owes] || 0) + getAmountAsFloat(amount);
    } else {
      // I owe this money
      acc[to] = (acc[to] || 0) - getAmountAsFloat(amount);
    }
    return acc;
  }, {});

  return (
    <section className={classes.statisticSection}>
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
