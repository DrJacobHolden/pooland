import React, { useContext } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import { format } from "date-fns";

import { GROUP_BY_OPTIONS } from "../constants";
import { FinanceContext } from "../FinanceWrapper";

const PeriodSelect = () => {
  const {
    dateRange,
    groupBy,
    setGroupBy,
    goBackPeriod,
    goForwardPeriod,
  } = useContext(FinanceContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#619380",
        paddingTop: 18,
      }}
    >
      <div style={{ alignSelf: "start", marginLeft: 16 }}>
        <Button icon={<LeftOutlined />} onClick={goBackPeriod} />
      </div>
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <Select value={groupBy} onChange={setGroupBy}>
          {GROUP_BY_OPTIONS.map(groupOption => (
            <Select.Option value={groupOption} key={groupOption}>
              {groupOption}
            </Select.Option>
          ))}
        </Select>
        <div style={{ fontSize: 12 }}>
          {format(dateRange[0], "dd/MM/yyyy")} -{" "}
          {format(dateRange[1], "dd/MM/yyyy")}
        </div>
      </div>
      <div style={{ alignSelf: "end", marginRight: 16 }}>
        <Button icon={<RightOutlined />} onClick={goForwardPeriod} />
      </div>
    </div>
  );
};

export { PeriodSelect };
