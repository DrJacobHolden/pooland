import { useStyles } from "./Header.styles";

const Header = ({ title, rightButton, style }) => {
  const classes = useStyles();

  return (
    <header className={classes.root} style={style}>
      <div className={classes.title}>{title}</div>
      {rightButton && <div className={classes.rightButton}>{rightButton}</div>}
    </header>
  );
};

export { Header };
