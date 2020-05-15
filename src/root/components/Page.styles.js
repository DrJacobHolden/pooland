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
  goBack: {
    position: "absolute",
    top: "50%",
    left: 20,
    transform: "translateY(-50%)",

    "& > span": {
      transform: "scale(2.5)",
    },
  },
  addTransaction: {
    position: "absolute",
    top: "50%",
    right: 20,
    transform: "translateY(-50%)",

    "& > span": {
      transform: "scale(2.5)",
    },
  },
});

export { useStyles };
