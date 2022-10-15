import axios from "axios";
import { LoginProps } from "./types";

const postLogin = async (loginBody: LoginProps) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_V2}/user/login`,
    loginBody
  );
};

export { postLogin };
