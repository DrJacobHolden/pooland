import { Link, useLocation } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

import { useStyles } from "./FinancePage.styles";
import { Header } from "root/components/Header";

const FinancePage = ({ children, title }) => {
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header
        title={title}
        rightButton={
          pathname !== "/finance/transactions/add" && (
            <Link
              className={classes.addTransaction}
              key="/add"
              to="/finance/transactions/add"
            >
              <PlusCircleOutlined />
            </Link>
          )
        }
      />
      {children}
    </div>
  );
};

export { FinancePage };
