import React from "react";
import { formatRelative } from "date-fns";
import { Button, List, Modal, Statistic, Tag } from "antd";

import { UserName } from "../../components/UserName";
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

function TransactionList({
  addTransactionButton,
  data,
  loading,
  onDelete,
  showWho = false,
  title = "Recent Transactions",
}) {
  const classes = useStyles();

  const showDelete = id => () => {
    Modal.confirm({
      title: "Delete Transaction",
      content: "Are you sure you would like to delete this transaction?",
      onOk: () => onDelete(id),
    });
  };

  return (
    <List
      className={classes.root}
      header={
        <div className={classes.header}>
          <h3>{title}</h3>
          {addTransactionButton}
        </div>
      }
      itemLayout="horizontal"
      dataSource={data?.transactions}
      renderItem={({
        amount,
        created_at: created,
        name,
        paid_id,
        id,
        tags,
        splits,
      }) => (
        <List.Item
          actions={
            onDelete
              ? [
                  <Button onClick={showDelete(id)} type="link" key="delete">
                    Delete
                  </Button>,
                ]
              : []
          }
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
            title={
              showWho ? (
                <>
                  <UserName userId={paid_id} /> bought {name}
                </>
              ) : (
                name
              )
            }
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
