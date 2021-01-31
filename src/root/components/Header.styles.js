import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
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
