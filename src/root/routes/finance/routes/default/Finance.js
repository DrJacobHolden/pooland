import React from "react";

import { StatisticsSection } from "../../components/StatisticsSection";
import { TransactionList } from "../../components/TransactionList";
import { useStyles } from "./Finance.styles";

const Finance = () => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <h1>Finance Dashboard</h1>
      </header>
      <StatisticsSection />
      <section className={classes.listSection}>
        <TransactionList />
      </section>
    </div>
  );
};

export { Finance };
