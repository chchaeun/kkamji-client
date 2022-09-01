import api from "../my-api";
import { getCode } from "../session-code";

interface Props {
  challengeId: string;
  week: string;
}

export const fetchQuizzes = async ({ challengeId, week }: Props) => {
  api.defaults.headers.common["code"] = getCode();

  const { data } = await api.get(`/challenges/${challengeId}/quizzes`, {
    params: { week },
  });
  return data;
};
