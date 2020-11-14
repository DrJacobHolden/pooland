import React, { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { useManualQuery } from "graphql-hooks";

import { GET_SPENT_BY_TAG, GET_TRANSACTIONS_FOR_RANGE } from "../queries";
import { useUser } from "root/helpers/useUser";
import { getTagSpendForTransactionList } from "../../../helpers/transaction";
import { SpendByTag } from "root/routes/finance/components/SpendByTag";
import { FinanceContext } from "root/routes/finance/FinanceWrapper";

const PeriodTagSpendBarGraph = () => {
  const { period } = useContext(FinanceContext);
  const userId = useUser();
  const [rawData, setRawData] = useState([]);
  const [getLifetimeData] = useManualQuery(GET_SPENT_BY_TAG);
  const [getPeriodData] = useManualQuery(GET_TRANSACTIONS_FOR_RANGE, {
    variables: {
      ...period?.period,
    },
  });

  useEffect(() => {
    setRawData([]);
    (async () => {
      if (period) {
        const { transactions } = (await getPeriodData()).data;
        setRawData(
          Object.values(
            getTagSpendForTransactionList(userId, transactions)
          ).sort((a, b) => b.total - a.total)
        );
      } else {
        setRawData((await getLifetimeData()).data.spent_by_tag);
      }
    })();
  }, [period]);

  if (!rawData) {
    return <Spin />;
  }

  return (
    <div>
      <h2 style={{ width: "100%", textAlign: "center" }}>
        Spend per tag{period ? ` this ${period.name}` : ""}
      </h2>
      <SpendByTag rawData={rawData} />
    </div>
  );
};

export { PeriodTagSpendBarGraph };
