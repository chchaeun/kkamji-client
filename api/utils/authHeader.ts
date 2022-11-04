import { getJwtToken } from "./getJwtToken";

const authorizationHeader = {
  Authorization: getJwtToken(),
};

export { authorizationHeader };
