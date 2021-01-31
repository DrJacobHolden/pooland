import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "graphql-hooks";

import { TransactionList } from "root/routes/finance/components/transaction-list/TransactionList";
import { useUser } from "root/helpers/useUser";

import { FinancePage } from "../../../../components/FinancePage";
import { DELETE_TRANSACTION, GET_RECENT_TRANSACTIONS } from "./queries";
import { PeriodSelect } from "root/routes/finance/components/PeriodSelect";
import { LandingTabs } from "root/routes/finance/components/LandingTabs";
import { FinanceContext } from "root/routes/finance/FinanceWrapper";

const PAGE_LENGTH = 20;

const ListTransactions = () => {
  const {
    dateRange: [startDate, endDate],
  } = useContext(FinanceContext);
  const userId = useUser();
  const [page, setPage] = useState(1);
  const { loading, data, refetch } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: {
      userId,
      limit: PAGE_LENGTH,
      offset: page === 1 ? undefined : PAGE_LENGTH * (page - 1),
      startDate,
      endDate,
    },
  });
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);

  return (
    <FinancePage title={<h1>Transactions</h1>}>
      <PeriodSelect />
      <LandingTabs />
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
            onChange: p => setPage(p),
            total: data?.transactions_aggregate.aggregate.totalCount,
            pageSize: PAGE_LENGTH,
          }}
        />
      </div>
    </FinancePage>
  );
};

export { ListTransactions };
