import React from "react";

import { useStyles } from "./Header.styles";

const Header = ({ children, headerStarters, headerExtras, style }) => {
  const classes = useStyles();

  return (
    <header className={classes.root} style={style}>
      {headerStarters}
      <h1>{children}</h1>
      {headerExtras}
    </header>
  );
};

export { Header };
