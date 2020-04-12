import { createUseStyles } from "react-jss";

const BUTTON_OVERRIDES = {
  borderColor: "#CCB676",
  backgroundColor: "#8E562E",
  color: "#2F2B28",
};

const useStyles = createUseStyles({
  page: {
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gridColumnGap: "0px",
    gridRowGap: "0px",
  },

  header: {
    gridArea: "1 / 1 / 2 / 6",

    backgroundColor: "#8E562E",
    display: "flex",

    "& > h1": {
      margin: "auto",
      color: "#2F2B28",
      fontSize: 60,
      textAlign: "center",
      textDecoration: "underline",
      textDecorationColor: "#CCB676",
    },
  },

  content: {
    gridArea: "2 / 1 / 5 / 6",

    position: "relative",
    backgroundColor: "#EBE3CE",
  },

  footer: {
    gridArea: "5 / 1 / 6 / 6",

    backgroundColor: "#619380",
    display: "flex",
  },

  loginButton: {
    ...BUTTON_OVERRIDES,
    transform: "scale(2)",
    margin: "auto",
  },

  menuRow: {
    margin: "auto",
    display: "flex",
    transform: "scale(2)",

    "& > .ant-btn": {
      ...BUTTON_OVERRIDES,
      marginLeft: 16,

      "&:first-child": {
        marginLeft: 0,
      },
    },
  },
});

export { useStyles };
