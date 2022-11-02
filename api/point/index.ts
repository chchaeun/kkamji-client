import { authorizationHeader } from "../authHeader";
import { api } from "../myApi";

const fetchMyPoint = async () => {
  const { data } = await api.get("/my/point", authorizationHeader);
  return data;
};

export { fetchMyPoint };
