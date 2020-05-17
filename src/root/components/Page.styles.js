import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  header: {
    position: "relative",
    flex: "0 0 60px",
    backgroundColor: "#8E562E",

    "& > h1": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      textAlign: "center",
    },
  },
});

export { useStyles };
