import React from "react";
import { Link } from "react-router-dom";

import { TransactionList } from "../../components/TransactionList";

const Finance = () => (
  <div>
    <header>
      <h1>Finance</h1>
    </header>
    <section>
      <TransactionList />
      <Link className="ant-btn" to="/finance/transactions/add">
        Add Transaction
      </Link>
    </section>
  </div>
);

export { Finance };
