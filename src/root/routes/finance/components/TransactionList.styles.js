import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",

    "& > .ant-list-header": {
      flex: "0 0 auto"
    },

    "& > .ant-spin-nested-loading": {
      flex: "1 1 auto",
      overflowY: "auto"
    }
  },
  header: {
    display: "flex",

    "& > h3": {
      paddingLeft: 20
    },
    "& > a": {
      marginLeft: "auto",
      marginRight: 20
    }
  }
});

export { useStyles };
