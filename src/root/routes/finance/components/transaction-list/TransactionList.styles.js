import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",

    "& > .ant-list-header": {
      flex: "0 0 auto",
    },

    "& > .ant-spin-nested-loading": {
      flex: "1 1 auto",
      overflowY: "auto",
    },
  },
  header: {
    display: "flex",

    "& > h3": {
      paddingLeft: 20,
    },
    "& > a": {
      marginLeft: "auto",
      marginRight: 20,
    },
  },

  listItem: {
    position: "relative",
    padding: "8px !important",
    paddingTop: "16px !important",

    "& .ant-list-item-meta-avatar": {
      paddingTop: 8,
      width: 80,
    },
    "& .ant-list-item-meta, & .ant-list-item-meta-title, & .ant-list-item-meta-content": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  cornerDate: {
    position: "absolute",
    top: 0,
    left: 8,
  },
});

export { useStyles };
