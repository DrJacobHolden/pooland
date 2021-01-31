import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  addTransaction: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",

    "& > span": {
      transform: "scale(2.5)",
    },
  },
});

export { useStyles };
