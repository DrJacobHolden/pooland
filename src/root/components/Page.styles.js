import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  header: {
    flex: "0 0 60px",
    display: "flex",
    backgroundColor: "#8E562E",

    "& > h1": {
      margin: "auto",
    },
  },
});

export { useStyles };
