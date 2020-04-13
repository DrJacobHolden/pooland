import React from "react";
import { AuthProvider } from "react-use-auth";
import { useHistory } from "react-router-dom";

function AuthWrapper({ children }) {
  const { replace } = useHistory();

  return (
    <AuthProvider
      navigate={replace}
      auth0_domain="pooland.auth0.com"
      auth0_client_id="EolbT7Pd0I4YyES2rbUH08jgn5EWMfOB"
    >
      {children}
    </AuthProvider>
  );
}

export { AuthWrapper };
