import React, { useState } from "react";
import { Button, Col, List, Row, Spin, Input, Modal } from "antd";
import { useQuery, useMutation } from "graphql-hooks";

import {
  COMPLETE_CHORE,
  CREATE_CHORE,
  GET_FLAT,
  GET_COMPLETION_COUNT,
} from "./queries";
import { Page } from "root/components/Page";
import { CreateFlatForm } from "./components/CreateFlatForm";
import { useUser } from "root/helpers/useUser";

const Flat = () => {
  const userId = useUser();
  const { loading, data, refetch } = useQuery(GET_FLAT);
  const { data: completionData, refetch: refetchCompletions } = useQuery(
    GET_COMPLETION_COUNT
  );
  const [addChore] = useMutation(CREATE_CHORE);
  const [addCompletion] = useMutation(COMPLETE_CHORE);
  const [choreName, setChoreName] = useState();
  const [choreLoading, setChoreLoading] = useState(false);
  const [completionLoading, setCompletionLoading] = useState(false);

  if (loading && !choreLoading) {
    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <Spin style={{ margin: "auto" }} />
      </div>
    );
  }

  if (data.flat.length === 0) {
    return (
      <Page header="Create Flat">
        <CreateFlatForm refetch={refetch} />
      </Page>
    );
  }

  // TODO: Handle flat selection
  const { id: flatId, name, chores, members } = data.flat[0];

  const submitChore = async () => {
    const choreToCreate = (choreName || "").trim();
    if (choreToCreate.length === 0) {
      return;
    }
    setChoreLoading(true);
    await addChore({ variables: { name: choreToCreate, flatId } });
    setChoreName("");
    await refetch();
    setChoreLoading(false);
  };

  const completeChore = choreId => async () => {
    Modal.confirm({
      title: "Confirm",
      content: "Lying is an offence punishable by barking.",
      onOk: async () => {
        setCompletionLoading(true);
        await addCompletion({ variables: { choreId } });
        setCompletionLoading(false);
        await refetchCompletions();
      },
    });
  };

  const completionStatistics = completionLoading
    ? {}
    : completionData.completion_counts.reduce(
        (acc, { user_id, completions, chore_id }) => {
          if (!acc[chore_id]) {
            acc[chore_id] = { me: 0, all: 0 };
          }
          if (user_id === userId) {
            acc[chore_id].me = completions;
          }
          acc[chore_id].all += completions;
          return acc;
        },
        {}
      );

  return (
    <Page header={name}>
      <List
        itemLayout="horizontal"
        dataSource={chores}
        renderItem={({ id, name }) => (
          <List.Item
            actions={[
              <Button onClick={completeChore(id)} type="link" key={id}>
                Complete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={name}
              description={`Average: ${(completionStatistics[id]?.all || 0) /
                (members.length + 1)} You: ${completionStatistics[id]?.me ||
                0}`}
            />
          </List.Item>
        )}
        footer={
          <Row justify="space-between" style={{ padding: 16 }}>
            <Col xs={18}>
              <Input
                disabled={choreLoading}
                onChange={e => setChoreName(e.target.value)}
                onPressEnter={submitChore}
                placeholder="Add a new chore"
                value={choreName}
              />
            </Col>
            <Button
              loading={choreLoading}
              onClick={submitChore}
              type="secondary"
            >
              Add
            </Button>
          </Row>
        }
        style={{ overflowY: "auto" }}
      />
    </Page>
  );
};

export { Flat };
