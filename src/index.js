/* eslint-disable fp/no-mutation */
import React from "react";
import ReactDOM from "react-dom";
import createAuth0Client from "@auth0/auth0-spa-js";
import { Root } from "./root/Root";
import "antd/dist/antd.css";

(async () => {
  window.auth0 = await createAuth0Client({
    domain: "pooland.auth0.com",
    client_id: "EolbT7Pd0I4YyES2rbUH08jgn5EWMfOB",
    redirect_uri:
      window.location.host === "localhost:3000"
        ? "http://localhost:3000/login"
        : "https://www.poo.land/login",
  });

  ReactDOM.render(<Root />, document.getElementById("root"));
})();
