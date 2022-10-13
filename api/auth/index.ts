import axios from "axios";
import { LoginProps } from "./types";

const postLogin = async (loginBody: LoginProps) => {
  return await axios.post(
    "https://prod.kkamjidot.com/v2/user/login",
    loginBody
  );
};

export { postLogin };
