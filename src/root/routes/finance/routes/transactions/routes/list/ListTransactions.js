import React, { useState } from "react";
import { useQuery, useMutation } from "graphql-hooks";

import { TransactionList } from "root/routes/finance/components/transaction-list/TransactionList";
import { useUser } from "root/helpers/useUser";

import { FinancePage } from "../../../../components/FinancePage";
import { DELETE_TRANSACTION, GET_RECENT_TRANSACTIONS } from "./queries";

const PAGE_LENGTH = 10;

const ListTransactions = () => {
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
    <FinancePage header="Transactions">
      <div
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
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
      </div>
    </FinancePage>
  );
};

export { ListTransactions };
