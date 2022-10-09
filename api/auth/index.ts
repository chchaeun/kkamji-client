import api from "../my-api";
import { LoginProps } from "./types";

const postLogin = async (loginBody: LoginProps) => {
  return await api.post("/user/login", loginBody);
};

export { postLogin };
