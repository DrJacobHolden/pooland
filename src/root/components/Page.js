import React from "react";

import { Header } from "./Header";
import { useStyles } from "./Page.styles";

const Page = ({ children, header, headerStarters, headerExtras }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {header && (
        <Header headerStarters={headerStarters} headerExtras={headerExtras}>
          {header}
        </Header>
      )}
      {children}
    </div>
  );
};

export { Page };
