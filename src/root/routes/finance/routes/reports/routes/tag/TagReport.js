import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "graphql-hooks";

import { GET_RECENT_TRANSACTIONS } from "./queries";
import { TransactionList } from "../../../../components/transaction-list/TransactionList";
import { FinancePage } from "root/routes/finance/components/FinancePage";

const PAGE_LENGTH = 10;

const TagReport = () => {
  const { tagName } = useParams();
  const [page, setPage] = useState(1);
  const {
    loading: recentTransactionsLoading,
    data: recentTransactions,
  } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: {
      tagName,
      limit: PAGE_LENGTH,
      offset: page === 1 ? undefined : PAGE_LENGTH * (page - 1),
    },
  });

  return (
    <FinancePage header={tagName}>
      <section style={{ flex: "1 1 100%", overflow: "hidden" }}>
        <TransactionList
          data={recentTransactions}
          pagination={{
            onChange: page => setPage(page),
            total:
              recentTransactions?.transactions_aggregate.aggregate.totalCount,
          }}
          loading={recentTransactionsLoading}
        />
      </section>
    </FinancePage>
  );
};

export { TagReport };
