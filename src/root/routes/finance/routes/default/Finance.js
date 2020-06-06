import React, { useState } from "react";
import { useMutation, useQuery } from "graphql-hooks";

import { DELETE_TRANSACTION, GET_RECENT_TRANSACTIONS } from "./queries";
import { StatisticsSection } from "./statistics-section/StatisticsSection";
import { TransactionList } from "../../components/transaction-list/TransactionList";
import { useUser } from "root/helpers/useUser";
import { TotalSpendTrend } from "./TotalSpendTrend";
import { Tabs } from "antd";
import { FinancePage } from "../../components/FinancePage";
import { SpendByTag } from "./SpendByTag";

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

  return (
    <FinancePage header="Finance Dashboard">
      <Tabs
        defaultActiveKey="statistics"
        style={{ flex: "1 1 100%", overflowY: "auto" }}
      >
        <Tabs.TabPane tab="Overview" key="statistics">
          <StatisticsSection />
          <TotalSpendTrend />
          <SpendByTag />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Transactions" key="transactions">
          <TransactionList
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
    </FinancePage>
  );
};

export { Finance };
