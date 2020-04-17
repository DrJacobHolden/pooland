import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import { path } from "ramda";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useUser } from "root/helpers/useUser";

import { ADD_TRANSACTION, GET_TAGS, ADD_TAG } from "./queries";
import { GET_RECENT_TRANSACTIONS } from "../../../../components/queries";

const getAdded = path(["data", "insert_transactions", "returning", 0]);

const updateCache = (cache, result) => {
  try {
    const { transactions: existingTransactions } = cache.readQuery({
      query: GET_RECENT_TRANSACTIONS,
    });
    const newTransactions = [
      getAdded(result),
      ...existingTransactions.slice(0, 9),
    ];
    cache.writeQuery({
      query: GET_RECENT_TRANSACTIONS,
      data: { transactions: newTransactions },
    });
  } catch (e) {
    console.log(e);
  }
};

const AddTransactionForm = () => {
  const userId = useUser();
  const { loading: tagsLoading, data, refetch } = useQuery(GET_TAGS);
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    update: updateCache,
  });
  const [addTag] = useMutation(ADD_TAG);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submit = async ({ amount, name, tags = [] }) => {
    setLoading(true);
    const result = await addTransaction({
      variables: {
        amount: `$${amount}`,
        name,
        paid_id: userId,
      },
    });

    const { id: transactionId } = getAdded(result);
    await Promise.all(
      tags.map(tagName =>
        addTag({
          variables: {
            name: tagName,
            transactionId,
          },
        })
      )
    );
    refetch();
    setLoading(false);
    history.push("/finance");
  };

  return (
    <Form onFinish={submit}>
      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: "Please input an amount!" }]}
      >
        <Input
          placeholder="70.00"
          prefix={<DollarCircleOutlined />}
          type="number"
        />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input a name!" }]}
      >
        <Input placeholder="Dog food" />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Select mode="tags" loading={tagsLoading} placeholder="dog">
          {data?.tags?.map(({ name }) => (
            <Select.Option key={name}>{name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" loading={loading} type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { AddTransactionForm };
