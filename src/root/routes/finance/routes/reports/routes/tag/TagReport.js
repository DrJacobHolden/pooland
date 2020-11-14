import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "graphql-hooks";

import {
  GET_RECENT_TRANSACTIONS,
  GET_ALL_TRANSACTIONS_FOR_TAG,
} from "./queries";
import { TransactionList } from "../../../../components/transaction-list/TransactionList";
import { FinancePage } from "root/routes/finance/components/FinancePage";
import { SpendByTag } from "root/routes/finance/components/SpendByTag";
import { getTagSpendForTransactionList } from "root/routes/finance/helpers/transaction";
import { useUser } from "root/helpers/useUser";

const PAGE_LENGTH = 10;

const TagReport = () => {
  const userId = useUser();
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
  const { data: allTransactions } = useQuery(GET_ALL_TRANSACTIONS_FOR_TAG, {
    variables: {
      tagName,
    },
  });

  return (
    <FinancePage header={tagName}>
      <h2 style={{ width: "100%", textAlign: "center" }}>
        Breakdown by Sub-Tag (Lifetime)
      </h2>
      {allTransactions?.transactions && (
        <SpendByTag
          rawData={Object.values(
            getTagSpendForTransactionList(userId, allTransactions.transactions)
          ).sort((a, b) => b.total - a.total)}
        />
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
        />
      </section>
    </FinancePage>
  );
};

export { TagReport };
