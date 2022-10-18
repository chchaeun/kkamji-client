import { getToken } from "../getToken";
import { api } from "../myApi";

const fetchMyPoint = async () => {
  api.defaults.headers.common["jwt"] = getToken();
  const { data } = await api.get("/my/point");
  return data;
};

export { fetchMyPoint };
