import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { Page } from "root/components/Page";
import { useStyles } from "./FinancePage.styles";

const FinancePage = ({ children, header }) => {
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <Page
      header={header}
      headerExtras={[
        pathname !== "/finance" && (
          <Link className={classes.goBack} key="/finance" to="/finance">
            <CloseCircleOutlined />
          </Link>
        ),
        pathname !== "/finance/transactions/add" && (
          <Link
            className={classes.addTransaction}
            key="/add"
            to="/finance/transactions/add"
          >
            <PlusCircleOutlined />
          </Link>
        ),
      ]}
    >
      {children}
    </Page>
  );
};

export { FinancePage };
