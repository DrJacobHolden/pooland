import React from "react";
import { formatRelative } from "date-fns";
import { useMutation, useQuery } from "graphql-hooks";
import { Link } from "react-router-dom";
import { Button, List, Modal, Statistic, Tag } from "antd";

import { DELETE_TRANSACTION, GET_RECENT_TRANSACTIONS } from "./queries";

function TransactionList() {
  const { loading, data, refetch } = useQuery(GET_RECENT_TRANSACTIONS);
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);

  const showDelete = id => () => {
    Modal.confirm({
      title: "Delete Transaction",
      content: "Are you sure you would like to delete this transaction?",
      onOk: () => deleteTransaction({ variables: { id } }).then(() => refetch())
    });
  };

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
      renderItem={({ amount, created_at: created, name, id, tags }) => (
        <List.Item
          actions={[
            <Button onClick={showDelete(id)} type="link">
              Delete
            </Button>
          ]}
        >
          <List.Item.Meta
            avatar={<Statistic value={amount} precision={2} />}
            title={name}
            description={
              <div>
                <span>{formatRelative(new Date(created), new Date())}</span>
                {tags?.map(({ name: tagName }) => (
                  <Tag key={tagName}>{tagName}</Tag>
                ))}
              </div>
            }
          />
        </List.Item>
      )}
      loading={loading}
      size="large"
    />
  );
}

export { TransactionList };
