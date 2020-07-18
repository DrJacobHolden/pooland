import React from "react";

import { useStyles } from "./Page.styles";

const Page = ({ children, header, headerStarters, headerExtras }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {header && (
        <header className={classes.header}>
          {headerStarters}
          <h1>{header}</h1>
          {headerExtras}
        </header>
      )}
      {children}
    </div>
  );
};

export { Page };
