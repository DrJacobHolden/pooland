import { useAuth } from "react-use-auth";

const HASURA_KEY = "https://hasura.io/jwt/claims";
const USER_ID_KEY = "x-hasura-user-id";

function useUser() {
  const { user } = useAuth();

  if (!user || !user[HASURA_KEY] || !user[HASURA_KEY][USER_ID_KEY]) {
    return undefined;
  }

  return user[HASURA_KEY][USER_ID_KEY];
}

export { useUser };
