import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flex: "0 0 60px",
    backgroundColor: "#8E562E",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    flexGrow: 1,
    paddingTop: "0.5em",
  },
  rightButton: {
    position: "relative",
    alignSelf: "end",
    marginRight: 16,
    width: 30,
    height: "100%",
  },
});

export { useStyles };
