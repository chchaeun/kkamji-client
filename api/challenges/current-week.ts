import api from "../my-api";
import { getCode } from "../session-code";

interface Props {
  challengeId: string;
}

export const fetchCurrentWeek = async ({ challengeId }: Props) => {
  api.defaults.headers.common["code"] = getCode();

  const { data } = await api.get(`/challenges/${challengeId}/now`);
  return data;
};
