import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useQuery, useMutation } from "graphql-hooks";
import { path } from "ramda";

import { ADD_FLAT_MEMBER, CREATE_FLAT, GET_USERS } from "../queries";
import { useUser } from "root/helpers/useUser";

const getAdded = path(["data", "insert_flat", "returning", 0]);

const CreateFlatForm = ({ refetch }) => {
  const userId = useUser();
  const [userSearch, setUserSearch] = useState("%a%");
  const { loading: usersLoading, data: usersData } = useQuery(GET_USERS, {
    variables: { searchString: userSearch },
  });
  const [createFlat] = useMutation(CREATE_FLAT);
  const [addMember] = useMutation(ADD_FLAT_MEMBER);
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ name, members }) => {
    setLoading(true);
    const result = await createFlat({ variables: { name } });
    const { id: flatId } = getAdded(result);

    await Promise.all(
      members.map(userId =>
        addMember({
          variables: {
            flatId,
            userId,
          },
        })
      )
    );
    refetch();
  };

  return (
    <Form
      onFinish={onSubmit}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 600,
        padding: 16,
      }}
    >
      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input a name!" }]}
          >
            <Input placeholder="Isle of Dogs" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label="Select members (you can add more later)"
            name={["members"]}
          >
            <Select
              mode="multiple"
              showSearch
              optionFilterProp="children"
              onSearch={string => setUserSearch(`%${string}%`)}
              loading={usersLoading}
              placeholder="Jack"
            >
              {usersData?.users
                ?.filter(({ id }) => id !== userId)
                .map(({ name, id }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={loading}
          type="primary"
          style={{ float: "right" }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { CreateFlatForm };
