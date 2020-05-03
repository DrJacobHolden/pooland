import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  header: {
    flex: "0 0 100px",
    display: "flex",
    backgroundColor: "#8E562E",

    "& > h1": {
      margin: "auto",
    },
  },
  listSection: {
    flex: "1 1 auto",
    overflow: "hidden",
  },
});

export { useStyles };
