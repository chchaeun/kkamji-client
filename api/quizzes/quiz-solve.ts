import api from "../my-api";
import { getCode } from "../session-code";
interface Props {
  quizId: string;
  answer: string;
}
export const updateQuizIsSolved = async ({ quizId, answer }: Props) => {
  api.defaults.headers.common["code"] = getCode();

  return await api.post(`/quizzes/${quizId}/solve`, { answer });
};
