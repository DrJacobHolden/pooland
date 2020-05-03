import React from "react";
import { useMutation, useQuery } from "graphql-hooks";
import { Link } from "react-router-dom";

import { Page } from "root/components/Page";

import { DELETE_TRANSACTION, GET_RECENT_TRANSACTIONS } from "./queries";
import { StatisticsSection } from "./statistics-section/StatisticsSection";
import { TransactionList } from "../../components/transaction-list/TransactionList";
import { useStyles } from "./Finance.styles";
import { useUser } from "root/helpers/useUser";

const Finance = () => {
  const userId = useUser();
  const { loading, data, refetch } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: { userId },
  });
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
  const classes = useStyles();

  return (
    <Page header="Finance Dashboard">
      <StatisticsSection />
      <section className={classes.listSection}>
        <TransactionList
          addTransactionButton={
            <Link
              className="ant-btn ant-btn-primary"
              to="/finance/transactions/add"
            >
              Add Transaction
            </Link>
          }
          data={data}
          loading={loading}
          onDelete={id =>
            deleteTransaction({ variables: { id } }).then(() => refetch())
          }
        />
      </section>
    </Page>
  );
};

export { Finance };
