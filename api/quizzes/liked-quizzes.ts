import api from "../my-api";
import { getCode } from "../session-code";

interface Props {
  challengeId: string;
}

export const fetchLikedQuizzes = async ({ challengeId }: Props) => {
  api.defaults.headers.common["code"] = getCode();

  const { data } = await api.get(`/challenges/${challengeId}/my-good-quizzes`);
  return data;
};
