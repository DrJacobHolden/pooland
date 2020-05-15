import React from "react";
import { formatRelative } from "date-fns";
import { Button, List, Modal, Tag } from "antd";

import { UserName } from "../../components/UserName";
import { useStyles } from "./TransactionList.styles";
import { SplitDonut } from "./SplitDonut";

function TransactionList({
  data,
  loading,
  onDelete,
  pagination,
  showWho = false,
  title,
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
          className={classes.listItem}
        >
          <List.Item.Meta
            avatar={<SplitDonut amount={amount} splits={splits} />}
            title={
              <span className={classes.listHeader}>
                {showWho ? (
                  <>
                    <UserName userId={paid_id} /> bought {name}
                  </>
                ) : (
                  name
                )}
              </span>
            }
            description={
              <div>
                <span className={classes.cornerDate}>
                  {formatRelative(new Date(created), new Date())}
                </span>
                {tags?.map(({ name: tagName }) => (
                  <Tag key={tagName}>{tagName}</Tag>
                ))}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}

export { TransactionList };
