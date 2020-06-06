import React from "react";
import { List } from "antd";

import { TransactionListItem } from "./TransactionListItem";
import { useStyles } from "./TransactionList.styles";

function TransactionList({
  data,
  loading,
  onDelete,
  pagination,
  showWho = false,
  title,
}) {
  const classes = useStyles();

  return (
    <List
      className={classes.root}
      header={
        title && (
          <div className={classes.header}>
            <h3>{title}</h3>
          </div>
        )
      }
      itemLayout="horizontal"
      dataSource={data?.transactions}
      loading={loading}
      size="large"
      pagination={pagination}
      renderItem={({ id }) => (
        <TransactionListItem
          transactionId={id}
          showWho={showWho}
          onDelete={onDelete}
        />
      )}
    />
  );
}

export { TransactionList };
