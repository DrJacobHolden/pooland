import React, { useContext } from "react";
import { Button, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { format } from "date-fns";

import { FinanceContext } from "root/routes/finance/FinanceWrapper";
import { FinancePage } from "../../components/FinancePage";
import { Header } from "root/components/Header";
import { PeriodText } from "./components/PeriodText/PeriodText";
import { GROUP_BY_OPTIONS } from "./constants";
import { WeekSpendBar } from "./components/RelativePeriodSpendBar/WeekSpendBar";
import { FortnightSpendBar } from "./components/RelativePeriodSpendBar/FortnightSpendBar";
import { MonthSpendBar } from "./components/RelativePeriodSpendBar/MonthSpendBar";
import { SpendByTag } from "./components/SpendByTag";
import { WeeklySpendBarGraph } from "./components/PeriodSpendBarGraph/WeeklySpendBarGraph";
import { FortnightlySpendBarGraph } from "./components/PeriodSpendBarGraph/FortnightlySpendBarGraph";
import { MonthlySpendBarGraph } from "./components/PeriodSpendBarGraph/MonthlySpendBarGraph";
import { DebtDisplay } from "./components/DebtDisplay/DebtDisplay";

const Finance = () => {
  const {
    dateRange,
    groupBy,
    setGroupBy,
    goBackPeriod,
    goForwardPeriod,
  } = useContext(FinanceContext);

  return (
    <FinancePage header="Finance Dashboard V2">
      <Header style={{ backgroundColor: "#619380" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ alignSelf: "start", marginLeft: 16 }}>
            <Button icon={<LeftOutlined />} onClick={goBackPeriod} />
          </div>
          <div style={{ flexGrow: 1 }}>
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
      </Header>
      <div
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <DebtDisplay />
        <PeriodText />
        {groupBy === "Week" && <WeekSpendBar />}
        {groupBy === "Fortnight" && <FortnightSpendBar />}
        {groupBy === "Month" && <MonthSpendBar />}
        <SpendByTag />
        {groupBy === "Week" && <WeeklySpendBarGraph />}
        {groupBy === "Fortnight" && <FortnightlySpendBarGraph />}
        {groupBy === "Month" && <MonthlySpendBarGraph />}
      </div>
    </FinancePage>
  );
};

export { Finance };
