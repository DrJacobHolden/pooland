import React from "react";
import { useMutation, useQuery } from "graphql-hooks";

import { StatisticsSection } from "./statistics-section/StatisticsSection";
import { TransactionList } from "../../components/transaction-list/TransactionList";
import { useStyles } from "./Finance.styles";
import { useUser } from "root/helpers/useUser";

import { DELETE_TRANSACTION, GET_RECENT_TRANSACTIONS } from "./queries";

const Finance = () => {
  const userId = useUser();
  const { loading, data, refetch } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: { userId },
  });
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <h1>Finance Dashboard</h1>
      </header>
      <StatisticsSection />
      <section className={classes.listSection}>
        <TransactionList
          data={data}
          loading={loading}
          onDelete={id =>
            deleteTransaction({ variables: { id } }).then(() => refetch())
          }
        />
      </section>
    </div>
  );
};

export { Finance };
