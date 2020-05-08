import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "graphql-hooks";

import { GET_RECENT_TRANSACTIONS, GET_REPORT_DATA } from "./queries";
import { Page } from "root/components/Page";
import { TransactionList } from "../../../../components/transaction-list/TransactionList";
import { UserName } from "../../../../components/UserName";
import { SpendTrend } from "./SpendTrend";

const UserReport = () => {
  const { userId } = useParams();
  const {
    loading: recentTransactionsLoading,
    data: recentTransactions,
  } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: { userId },
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
          loading={recentTransactionsLoading}
          showWho
          title={"Recent Shared Expenses"}
        />
      </section>
    </Page>
  );
};

export { UserReport };
