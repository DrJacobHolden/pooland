import React from "react";

import { TransactionList } from "../../components/TransactionList";

const Finance = () => (
  <div>
    <header
      style={{ display: "flex", backgroundColor: "#8E562E", height: 100 }}
    >
      <h1 style={{ margin: "auto" }}>Finance Dashboard</h1>
    </header>
    <section>
      <TransactionList />
    </section>
  </div>
);

export { Finance };
