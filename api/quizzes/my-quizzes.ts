import api from "../my-api";
import { getCode } from "../session-code";

interface Props {
  challengeId: string;
  week?: number;
}

export const fetchMyQuizzes = async ({ challengeId, week }: Props) => {
  api.defaults.headers.common["code"] = getCode() || "";

  // week가 없으면 0으로 요청하여 전체 퀴즈 리스트를 반환한다.
  const { data } = await api.get(`/challenges/${challengeId}/my/quizzes`, {
    params: {
      week: week ? week : 0,
    },
  });
  return data;
};
