import axios from "axios";
import { apiV2 } from "../myApi";
import { LoginProps } from "./types";

const postLogin = async (loginBody: LoginProps) => {
  return await apiV2.post("/user/login", loginBody);
};

export { postLogin };
