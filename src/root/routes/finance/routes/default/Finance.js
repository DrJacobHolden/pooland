import React, { useState } from "react";
import { useMutation, useQuery } from "graphql-hooks";
import { Link } from "react-router-dom";

import { Page } from "root/components/Page";

import { DELETE_TRANSACTION, GET_RECENT_TRANSACTIONS } from "./queries";
import { StatisticsSection } from "./statistics-section/StatisticsSection";
import { TransactionList } from "../../components/transaction-list/TransactionList";
import { useStyles } from "./Finance.styles";
import { useUser } from "root/helpers/useUser";
import { TotalSpendTrend } from "./TotalSpendTrend";
import { Tabs } from "antd";

const PAGE_LENGTH = 10;

const Finance = () => {
  const userId = useUser();
  const [page, setPage] = useState(1);
  const { loading, data, refetch } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: {
      userId,
      limit: PAGE_LENGTH,
      offset: page === 1 ? undefined : PAGE_LENGTH * (page - 1),
    },
  });
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
  const classes = useStyles();

  return (
    <Page header="Finance Dashboard">
      <Tabs
        defaultActiveKey="statistics"
        style={{ flex: "1 1 100%", overflowY: "auto" }}
      >
        <Tabs.TabPane tab="Overview" key="statistics">
          <StatisticsSection />
          <TotalSpendTrend />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Transactions" key="transactions">
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
            pagination={{
              onChange: page => setPage(page),
              total: data?.transactions_aggregate.aggregate.totalCount,
            }}
          />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  );
};

export { Finance };
