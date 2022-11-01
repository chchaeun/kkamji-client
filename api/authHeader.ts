import { getJwtToken } from "./getJwtToken";

const authorizationHeader = {
  headers: {
    Authorization: getJwtToken(),
  },
};

export { authorizationHeader };
