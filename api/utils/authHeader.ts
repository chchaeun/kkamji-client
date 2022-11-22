import { getJwtToken } from "./getJwtToken";

const authorizationHeader = (token: string) => {
  return { Authorization: token };
};

export { authorizationHeader };
