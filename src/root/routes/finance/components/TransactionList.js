import React from "react";
import { formatRelative } from "date-fns";
import { useMutation, useQuery } from "graphql-hooks";
import { Link } from "react-router-dom";
import { Button, List, Modal, Statistic, Tag } from "antd";
import { useUser } from "root/helpers/useUser";

import { DELETE_TRANSACTION, GET_RECENT_TRANSACTIONS } from "./queries";
import { useStyles } from "./TransactionList.styles";

const amountAsFloat = input =>
  parseFloat(input.replace("$", "").replace(",", ""));
const getValue = (amount, splits) => {
  if (splits?.length > 0) {
    return splits.reduce(
      (acc, { percentage }) => acc - amount * (percentage / 100),
      amount
    );
  }
  return amount;
};

function TransactionList() {
  const userId = useUser();
  const { loading, data, refetch } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: { userId }
  });
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);
  const classes = useStyles();

  const showDelete = id => () => {
    Modal.confirm({
      title: "Delete Transaction",
      content: "Are you sure you would like to delete this transaction?",
      onOk: () => deleteTransaction({ variables: { id } }).then(() => refetch())
    });
  };

  return (
    <List
      className={classes.root}
      header={
        <div className={classes.header}>
          <h3>Recent Transactions</h3>
          <Link
            className="ant-btn ant-btn-primary"
            to="/finance/transactions/add"
          >
            Add Transaction
          </Link>
        </div>
      }
      itemLayout="horizontal"
      dataSource={data?.transactions}
      renderItem={({ amount, created_at: created, name, id, tags, splits }) => (
        <List.Item
          actions={[
            <Button onClick={showDelete(id)} type="link">
              Delete
            </Button>
          ]}
        >
          <List.Item.Meta
            avatar={
              <Statistic
                value={getValue(amountAsFloat(amount), splits)}
                precision={2}
                prefix="$"
                suffix={`/ ${amount}`}
              />
            }
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
