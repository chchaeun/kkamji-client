import api from "../my-api";
import { getCode } from "../session-code";
interface Props {
  quizId: string;
  rate: "GOOD" | "BAD" | null;
}
export const updateQuizRate = async ({ quizId, rate }: Props) => {
  api.defaults.headers.common["code"] = getCode();

  return await api.put(`/quizzes/${quizId}/rate`, { rate });
};
