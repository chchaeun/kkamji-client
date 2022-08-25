import api from "../my-api";
import { getCode } from "../session-code";
interface Props {
  quizId: string;
  score: number;
}
export const updateQuizScore = async ({ quizId, score }: Props) => {
  api.defaults.headers.common["code"] = getCode();

  return await api.post(`/quizzes/${quizId}/solve`, { score });
};
