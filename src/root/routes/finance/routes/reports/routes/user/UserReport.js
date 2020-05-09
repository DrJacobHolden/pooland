import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "graphql-hooks";

import { GET_RECENT_TRANSACTIONS, GET_REPORT_DATA } from "./queries";
import { Page } from "root/components/Page";
import { TransactionList } from "../../../../components/transaction-list/TransactionList";
import { UserName } from "../../../../components/UserName";
import { SpendTrend } from "./SpendTrend";

const PAGE_LENGTH = 10;

const UserReport = () => {
  const { userId } = useParams();
  const [page, setPage] = useState(1);
  const {
    loading: recentTransactionsLoading,
    data: recentTransactions,
  } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: {
      userId,
      limit: PAGE_LENGTH,
      offset: page === 1 ? undefined : PAGE_LENGTH * (page - 1),
    },
  });
  const { data: reportData, loading: reportDataLoading } = useQuery(
    GET_REPORT_DATA,
    {
      variables: {
        userId: userId,
      },
    }
  );

  return (
    <Page
      header={
        <span>
          History with <UserName userId={userId} />
        </span>
      }
    >
      {reportDataLoading ? (
        "Loading..."
      ) : (
        <SpendTrend data={reportData} otherUserId={userId} />
      )}
      <section style={{ flex: "1 1 100%", overflow: "hidden" }}>
        <TransactionList
          data={recentTransactions}
          pagination={{
            onChange: page => setPage(page),
            total:
              recentTransactions?.transactions_aggregate.aggregate.totalCount,
          }}
          loading={recentTransactionsLoading}
          showWho
          title={"Shared Expenses"}
        />
      </section>
    </Page>
  );
};

export { UserReport };
