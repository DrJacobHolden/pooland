import { useRef, useState } from "react";
import moment from "moment";
import { useManualQuery } from "graphql-hooks";

import { FinancePage } from "../../../../components/FinancePage";
import { AddTransactionForm } from "../add/AddTransactionForm";
import { ImportTransactionsForm } from "./ImportTransactionsForm";
import { GET_DUPLICATE_TRANSACTION, GET_MATCHING_TRANSACTION } from "./queries";

const ImportTransactions = () => {
  const [getMatchingTransaction] = useManualQuery(GET_MATCHING_TRANSACTION);
  const [getDuplicateTransaction] = useManualQuery(GET_DUPLICATE_TRANSACTION);
  const [transactions, setTransactions] = useState();
  const transactionIndex = useRef(-1);

  const getFormNextValues = async () => {
    transactionIndex.current++;
    if (!transactions[transactionIndex.current]) {
      setTransactions([]);
      return;
    }

    const { TRNAMT, MEMO, DTPOSTED, FITID, NAME, TRNTYPE } =
      transactions[transactionIndex.current];

    const duplicateTransactionData = await getDuplicateTransaction({
      variables: {
        bank_ref_id: FITID,
      },
    });

    if (duplicateTransactionData.data.transactions[0]) {
      // Skip.
      return await getFormNextValues();
    }

    const bank_ref_text = TRNTYPE === "POS" ? NAME : MEMO;

    const matchingTransactionData = await getMatchingTransaction({
      variables: {
        bank_ref_text,
      },
    });

    const matchingTransaction = matchingTransactionData.data
      .transactions[0] || { splits: [], tags: [] };

    return {
      amount: parseFloat(TRNAMT) * -1,
      created_at: moment(DTPOSTED),
      bank_ref_text,
      bank_ref_id: FITID,
      name: matchingTransaction.name,
      splits: matchingTransaction.splits.map(({ percentage, user_id }) => ({
        percentage,
        splitUserId: user_id,
      })),
      tags: matchingTransaction.tags.map(({ name }) => name),
    };
  };

  return (
    <FinancePage title={<h1>Import Transactions</h1>}>
      {typeof transactions === "undefined" ? (
        <ImportTransactionsForm
          onChange={(transactions) => {
            setTransactions(transactions);
          }}
        />
      ) : transactions.length === 0 ? (
        <p>All transactions loaded.</p>
      ) : (
        <AddTransactionForm getFormNextValues={getFormNextValues} />
      )}
    </FinancePage>
  );
};

export { ImportTransactions };
