import axios from "axios";
import { getCode } from "./session-code";

const api = axios.create({
  baseURL: "https://a61e9270-0366-4013-a651-fbc3d46384ab.mock.pstmn.io/v1",
  // baseURL: "http://localhost:8080/v1",
  // baseURL: "https://prod.kkamjidot.com/v1",
});

api.defaults.headers.common["code"] = getCode() || "";

export default api;
