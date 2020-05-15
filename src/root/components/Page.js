import React from "react";

import { useStyles } from "./Page.styles";

const Page = ({ children, header }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {header && (
        <header className={classes.header}>
          <h1>{header}</h1>
        </header>
      )}
      {children}
    </div>
  );
};

export { Page };