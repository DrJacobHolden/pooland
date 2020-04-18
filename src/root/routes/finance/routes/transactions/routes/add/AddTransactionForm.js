import React, { Fragment, useState } from "react";
import {
  AutoComplete,
  Button,
  Form,
  Input,
  Select,
  Slider,
  InputNumber
} from "antd";
import { path, range } from "ramda";
import { useMutation, useQuery } from "graphql-hooks";
import { useHistory } from "react-router-dom";
import { useUser } from "root/helpers/useUser";

import {
  ADD_TRANSACTION,
  GET_TAGS,
  ADD_TAG,
  ADD_SPLIT,
  GET_USERS
} from "./queries";

const getAdded = path(["data", "insert_transactions", "returning", 0]);

const AddTransactionForm = () => {
  const userId = useUser();
  const [userSearch, setUserSearch] = useState("%a%");
  const { loading: tagsLoading, data: tagsData } = useQuery(GET_TAGS);
  const { loading: usersLoading, data: usersData } = useQuery(GET_USERS, {
    variables: { searchString: userSearch }
  });
  const [addTransaction] = useMutation(ADD_TRANSACTION);
  const [addTag] = useMutation(ADD_TAG);
  const [addSplit] = useMutation(ADD_SPLIT);
  const [loading, setLoading] = useState(false);
  const [splitCount, setSplitCount] = useState(0);

  const history = useHistory();

  const submit = async ({ amount, name, splits = [], tags = [] }) => {
    setLoading(true);
    const result = await addTransaction({
      variables: {
        amount: `$${amount}`,
        name,
        paid_id: userId
      }
    });

    const { id: transactionId } = getAdded(result);
    await Promise.all([
      // Add tags
      ...tags.map(tagName =>
        addTag({
          variables: {
            name: tagName,
            transactionId
          }
        })
      ),
      // Add splits
      ...splits.map(({ splitUserId, percentage }) =>
        addSplit({
          variables: {
            user_id: splitUserId,
            percentage,
            transactionId
          }
        })
      )
    ]);
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
        <InputNumber
          min={0}
          max={20000000}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={value => value.replace(/\$\s?|(,*)/g, "")}
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
          {tagsData?.tags?.map(({ name }) => (
            <Select.Option key={name}>{name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      {range(0, splitCount).map(index => (
        <Fragment key={index}>
          <Form.Item
            label="Split with"
            name={["splits", index, "splitUserId"]}
            rules={[{ required: true, message: "Please select a user!" }]}
          >
            <AutoComplete
              onSearch={string => setUserSearch(`%${string}%`)}
              loading={usersLoading}
              placeholder="Jack"
            >
              {usersData?.users?.map(({ name, id }) => (
                <AutoComplete.Option key={id} value={id}>
                  {name}
                </AutoComplete.Option>
              ))}
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label="Split (%)"
            name={["splits", index, "percentage"]}
            rules={[{ required: true, message: "Please input a percentage!" }]}
          >
            <Slider
              marks={{ 0: "0%", 25: "25%", 50: "50%", 75: "75%", 100: "100%" }}
              min={0}
              max={100}
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {form => {
              const amount = form.getFieldValue("amount") || 0;
              const percentage =
                form.getFieldValue(["splits", index, "percentage"]) || 0;
              const splitAmount = (amount / 100) * percentage;

              return `$${splitAmount.toFixed(2)}`;
            }}
          </Form.Item>
          <Form.Item shouldUpdate>
            {form => {
              const splitRemainder = range(0, splitCount).reduce(
                (acc, splitIndex) => {
                  if (splitIndex === index) return acc;
                  return (
                    acc -
                    (form.getFieldValue(["splits", splitIndex, "percentage"]) ||
                      0)
                  );
                },
                100
              );
              return (
                <Form.Item name={["splits", index, "percentage"]}>
                  <InputNumber
                    min={0}
                    max={splitRemainder}
                    formatter={value => `${value}%`}
                    parser={value => value.replace("%", "")}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Fragment>
      ))}

      <Form.Item>
        <Button onClick={() => setSplitCount(splitCount + 1)} type="link">
          Split
        </Button>
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
