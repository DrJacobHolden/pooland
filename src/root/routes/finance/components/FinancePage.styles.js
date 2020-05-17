import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
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
