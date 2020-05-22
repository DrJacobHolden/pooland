import { useContext } from "react";
import { AuthContext } from "root/wrappers/AuthWrapper";

const HASURA_KEY = "https://hasura.io/jwt/claims";
const USER_ID_KEY = "x-hasura-user-id";

function useUser() {
  const { user } = useContext(AuthContext);

  if (!user || !user[HASURA_KEY] || !user[HASURA_KEY][USER_ID_KEY]) {
    return undefined;
  }

  return user[HASURA_KEY][USER_ID_KEY];
}

export { useUser };
