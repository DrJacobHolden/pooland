import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "react-use-auth";

import EmojiRain from "root/components/EmojiRain";

import { useStyles } from "./LandingPage.style";

function LandingPage() {
  const { isAuthenticated, login, logout } = useAuth();
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <h1>Welcome to Poo Land</h1>
      </header>
      <section className={classes.content}>
        <EmojiRain active drops={250} />
      </section>
      <footer className={classes.footer}>
        {isAuthenticated() ? (
          <div className={classes.menuRow}>
            <Link className="ant-btn" to="/finance">
              Finance
            </Link>
            <Button onClick={logout}>Sign Out</Button>
          </div>
        ) : (
          <Button className={classes.loginButton} onClick={login}>
            Sign In with Auth0
          </Button>
        )}
      </footer>
    </div>
  );
}

export { LandingPage };
