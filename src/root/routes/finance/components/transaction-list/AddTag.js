import React, { useEffect, useRef, useState } from "react";
import { Tag, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "graphql-hooks";

import { ADD_TAG } from "./queries";

const AddTag = ({ onCreate, transactionId }) => {
  const [addTag] = useMutation(ADD_TAG);
  const input = useRef();
  const [loading, setLoading] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputVisible && input.current) {
      input.current.focus();
    }
  }, [inputVisible, input]);

  const handleInputChange = e => setInputValue(e.target.value);

  const handleInputConfirm = async () => {
    setLoading(true);
    const newTag = inputValue;
    await addTag({
      variables: {
        name: newTag,
        transactionId,
      },
    });
    setInputVisible(false);
    setInputValue("");
    if (onCreate) {
      onCreate(newTag);
    }
    setLoading(false);
  };

  return (
    <>
      {inputVisible && (
        <Input
          ref={input}
          type="text"
          size="small"
          disabled={loading}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => {
            if (!loading) {
              setInputVisible(false);
            }
          }}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={() => setInputVisible(true)}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export { AddTag };
