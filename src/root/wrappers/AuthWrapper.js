import React, { createContext, useState } from "react";

const AuthContext = createContext({});

function AuthWrapper({ children }) {
  const [signedIn, setSignedIn] = useState();

  async function checkLogin() {
    setSignedIn(await window.auth0.isAuthenticated());
  }

  async function parseLogin() {
    try {
      await window.auth0.handleRedirectCallback();
      setSignedIn(true);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  async function signIn() {
    await window.auth0.loginWithRedirect();
  }

  async function signOut() {
    await window.auth0.logout();
    setSignedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        checkLogin,
        parseLogin,
        signedIn,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthWrapper, AuthContext };
