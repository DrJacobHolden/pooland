import { format } from "date-fns";
import { Button, List, Modal, Tag } from "antd";
import { useQuery } from "graphql-hooks";

import { UserName } from "../UserName";
import { useStyles } from "./TransactionList.styles";
import { SplitDonut } from "./SplitDonut";
import { useUser } from "root/helpers/useUser";
import { GET_LIST_ITEM_DATA } from "./queries";
import { AddTag } from "./AddTag";

const DEFAULT_TRANSACTION = {
  created_at: undefined,
  name: "",
  paid_id: undefined,
  tags: [],
};

function TransactionListItem({ transactionId, onDelete, showWho = false }) {
  const { data, refetch } = useQuery(GET_LIST_ITEM_DATA, {
    variables: { transactionId },
  });
  const userId = useUser();
  const classes = useStyles();

  const showDelete = (id) => () => {
    Modal.confirm({
      title: "Delete Transaction",
      content: "Are you sure you would like to delete this transaction?",
      onOk: () => onDelete(id),
    });
  };

  const {
    created_at: created,
    name,
    paid_id,
    tags,
  } = data?.transactions[0] || DEFAULT_TRANSACTION;
  const you = paid_id === userId;

  return (
    <List.Item
      actions={
        onDelete && you
          ? [
              <Button
                onClick={showDelete(transactionId)}
                type="link"
                key="delete"
              >
                Delete
              </Button>,
            ]
          : []
      }
      className={classes.listItem}
    >
      <List.Item.Meta
        avatar={<SplitDonut transactionId={transactionId} />}
        title={
          <span className={classes.listHeader}>
            {showWho && paid_id ? (
              <>
                {you ? "You" : <UserName userId={paid_id} />} bought {name}
              </>
            ) : (
              name
            )}
          </span>
        }
        description={
          <div>
            <span className={classes.cornerDate}>
              {created && format(new Date(created), "dd/M/yy")}
            </span>
            {tags?.map(({ name: tagName }) => (
              <Tag key={tagName}>{tagName}</Tag>
            ))}
            <AddTag onCreate={() => refetch()} transactionId={transactionId} />
          </div>
        }
      />
    </List.Item>
  );
}

export { TransactionListItem };
