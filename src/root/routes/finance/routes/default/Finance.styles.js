import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  },
  header: {
    flex: "0 0 100px",
    display: "flex",
    backgroundColor: "#8E562E",

    "& > h1": {
      margin: "auto"
    }
  },
  statisticSection: {
    flex: "0 0 auto"
  },
  statistic: {
    backgroundColor: "#619380",
    textAlign: "center",
    marginBottom: 8,
    padding: 8
  },
  listSection: {
    flex: "1 1 auto",
    overflow: "hidden"
  }
});

export { useStyles };
