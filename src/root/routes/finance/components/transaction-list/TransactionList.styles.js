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
    padding: "0px !important",

    "& .ant-list-item-meta-content": {
      padding: "16px 8px 8px",
    },

    "& .ant-list-item-meta-avatar": {
      margin: "8px -30px 8px -30px",
      width: 144,
      height: 72,
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
    right: 8,
  },
});

export { useStyles };
