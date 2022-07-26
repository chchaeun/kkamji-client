import axios from "axios";
import { getCode } from "./session-code";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.defaults.headers.common["code"] = getCode() || "";

export default api;
