import React, { useEffect } from "react";
import { Col, Row, Statistic } from "antd";
import { Link } from "react-router-dom";
import { toPairs } from "ramda";
import { useQuery, useManualQuery } from "graphql-hooks";

import { useUser } from "root/helpers/useUser";

import { UserName } from "../../../components/UserName";
import { GET_SPENT, GET_OWED, GET_TRANSACTIONS_FOR_RANGE } from "./queries";
import { useStyles } from "./StatisticsSection.styles";
import { getAmountAsFloat } from "root/routes/finance/helpers/getAmountAsFloat";
import {
  partitionTransactionList,
  useEarliestDate,
} from "root/routes/finance/helpers/transaction";

const StatisticsSection = ({ period }) => {
  const userId = useUser();
  const earliestDate = useEarliestDate();
  const { data: spent } = useQuery(GET_SPENT);
  const { data: owedData } = useQuery(GET_OWED);
  const [
    getTransactions,
    { data: periodTransactions = { transactions: [] } },
  ] = useManualQuery(GET_TRANSACTIONS_FOR_RANGE, {
    variables: {
      ...period?.period,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    if (period) {
      getTransactions();
    }
  }, [period]);

  const {
    onBehalf: onBehalfForPeriod,
    personal: personalForPeriod,
    byUser: byUserForPeriod,
  } = partitionTransactionList(userId, periodTransactions.transactions);
  const totalForPeriod = personalForPeriod + onBehalfForPeriod;

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
        <Col xs={12} md={6}>
          <Statistic
            title="Total Spend"
            precision={2}
            prefix="$"
            value={period ? totalForPeriod : totalSpend}
          />
        </Col>

        <Col xs={12} md={6}>
          {period && earliestDate && (
            <Statistic
              title="Average Spend"
              precision={2}
              prefix="$"
              value={totalSpend / period.averageFunction(earliestDate)}
            />
          )}
        </Col>
        <Col xs={12} md={6}>
          <Statistic
            title="Personal Spend"
            precision={2}
            prefix="$"
            value={period ? personalForPeriod : personalSpend}
          />
        </Col>
        <Col xs={12} md={6}>
          <Statistic
            title="On-Behalf Spend"
            precision={2}
            prefix="$"
            value={period ? onBehalfForPeriod : onBehalfSpend}
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
                suffix={
                  period
                    ? byUserForPeriod[owingId]
                      ? value > 0
                        ? `(${
                            byUserForPeriod[owingId] > 0 ? "+ $" : "- $"
                          }${Math.abs(Math.round(byUserForPeriod[owingId]))})`
                        : `(${
                            byUserForPeriod[owingId] > 0 ? "- $" : "+ $"
                          }${Math.abs(Math.round(byUserForPeriod[owingId]))})`
                      : "(+ $0)"
                    : undefined
                }
              />
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export { StatisticsSection };
