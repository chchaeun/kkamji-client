import api from "../my-api";

export interface IUserInfo {
  userName: string;
  point: number;
  period: number;
}

export const fetchUserInfo = async () => {
  const {
    data: { result },
  } = await api.get("/users");

  return result;
};
