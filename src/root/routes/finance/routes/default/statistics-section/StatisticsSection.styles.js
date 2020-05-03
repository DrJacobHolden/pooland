import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  statisticSection: {
    flex: "0 0 auto",
  },
  row: {
    display: "flex",
  },
  statistic: {
    backgroundColor: "#619380",
    textAlign: "center",
    marginBottom: 8,
    padding: 8,
  },
});

export { useStyles };
