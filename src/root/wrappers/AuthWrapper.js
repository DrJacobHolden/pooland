import React, { createContext, useCallback, useEffect, useState } from "react";
import { Auth0Client } from "auth0-spa-js";
import { useHistory } from "react-router-dom";

const callbackDomain = `${window.location.protocol}//${window.location.host}`;
const auth0Domain = "pooland.auth0.com";
const client_id = "EolbT7Pd0I4YyES2rbUH08jgn5EWMfOB";
const storageKey =
  "@@auth0spajs@@::EolbT7Pd0I4YyES2rbUH08jgn5EWMfOB::default::openid profile email offline_access";

const auth0 = new Auth0Client({
  domain: auth0Domain,
  client_id,
  redirect_uri: `${callbackDomain}/auth0_callback`,
  cacheLocation: "localstorage",
  useRefreshTokens: true,
});

const AuthContext = createContext({});

function AuthWrapper({ children }) {
  const { push } = useHistory();
  const [user, setUser] = useState();
  const [authResult, setAuthResult] = useState();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = useCallback(async () => {
    await auth0.handleRedirectCallback();
    hackToken();
    push("/");
  }, []);
  const login = useCallback(async () => {
    await auth0.loginWithRedirect();
  }, []);
  const logout = useCallback(async () => {
    await auth0.logout({ returnTo: callbackDomain });
    setIsAuthenticated(false);
  }, []);

  const hackToken = () => {
    const json = window.localStorage.getItem(storageKey);
    if (json) {
      const { body, expiresAt } = JSON.parse(json);
      if (expiresAt > Date.now() / 1000) {
        const { decodedToken, id_token } = body;
        setUser(decodedToken.user);
        setAuthResult(id_token);
        setIsAuthenticating(false);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticating(false);
        window.localStorage.removeItem(storageKey);
      }
    } else {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    hackToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authResult,
        handleAuthentication,
        login,
        logout,
        isAuthenticating,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
