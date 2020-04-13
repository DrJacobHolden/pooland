import React from "react";
import { formatRelative } from "date-fns";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { List, Statistic } from "antd";
import { useUser } from "root/helpers/useUser";

const GET_TRANSACTIONS = gql`
  query getTransactions($userId: uuid!) {
    transactions(
      limit: 10
      order_by: { created_at: desc }
      where: { paid_id: { _eq: $userId } }
    ) {
      name
      created_at
      id
      amount
    }
  }
`;

function TransactionList() {
  const userId = useUser();
  const { loading, data } = useQuery(GET_TRANSACTIONS, {
    variables: { userId },
  });

  return (
    <List
      header={<h3 style={{ paddingLeft: 20 }}>Recent Transactions</h3>}
      footer={
        <Link
          className="ant-btn ant-btn-primary"
          style={{ marginLeft: "calc(100% - 145px)" }}
          to="/finance/transactions/add"
        >
          Add Transaction
        </Link>
      }
      itemLayout="horizontal"
      dataSource={data?.transactions}
      renderItem={({ amount, created_at: created, name }) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Statistic value={amount} precision={2} />}
            title={name}
            description={formatRelative(new Date(created), new Date())}
          />
        </List.Item>
      )}
      loading={loading}
      size="large"
    />
  );
}

export { TransactionList };
