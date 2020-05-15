import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { useStyles } from "./Page.styles";

const Page = ({ children, header }) => {
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {header && (
        <header className={classes.header}>
          <h1>{header}</h1>
          {pathname !== "/finance" && (
            <Link className={classes.goBack} to="/finance">
              <CloseCircleOutlined />
            </Link>
          )}
          {pathname !== "/finance/transactions/add" && (
            <Link
              className={classes.addTransaction}
              to="/finance/transactions/add"
            >
              <PlusCircleOutlined />
            </Link>
          )}
        </header>
      )}
      {children}
    </div>
  );
};

export { Page };
