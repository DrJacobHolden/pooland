import React, { useContext } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { AuthContext } from "root/wrappers/AuthWrapper";
import EmojiRain from "root/components/EmojiRain";

import { useStyles } from "./LandingPage.style";

function LandingPage() {
  const { signedIn, signIn, signOut } = useContext(AuthContext);
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
        {signedIn ? (
          <div className={classes.menuRow}>
            <Link className="ant-btn" to="/finances">
              Finance
            </Link>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        ) : (
          <Button className={classes.loginButton} onClick={signIn}>
            Sign In with Auth0
          </Button>
        )}
      </footer>
    </div>
  );
}

export { LandingPage };
