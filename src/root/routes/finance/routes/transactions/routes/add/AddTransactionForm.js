import React from "react";
import { Button, Form, Input } from "antd";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useUser } from "root/helpers/useUser";

const ADD_TRANSACTION = gql`
  mutation insertTransactions(
    $amount: money!
    $name: String!
    $paid_id: uuid!
  ) {
    insert_transactions(
      objects: [{ amount: $amount, name: $name, paid_id: $paid_id }]
    ) {
      affected_rows
    }
  }
`;

const AddTransactionForm = () => {
  const userId = useUser();
  const [insertTransaction] = useMutation(ADD_TRANSACTION);
  const history = useHistory();

  const submit = async ({ amount, name }) => {
    await insertTransaction({
      variables: {
        amount: `$${amount}`,
        name,
        paid_id: userId,
      },
    });
    history.push("/finance");
  };

  return (
    <Form onFinish={submit}>
      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: "Please input an amount!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input a name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { AddTransactionForm };
