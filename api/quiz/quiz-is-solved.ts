import api from "../my-api";
import { getCode } from "../session-code";
export interface IQuizIsSolved {
  userId: number;
  userName: string;
  quizId: number;
  quizIsSolved: boolean;
}
export const fetchQuizIsSolved = async (quizId: string) => {
  const { data } = await api.get(`/quizzes/${quizId}/is-solved`);
  return data;
};
export const updateQuizIsSolved = async (props: {
  quizId: string;
  isCorrect: boolean;
}) => {
  api.defaults.headers.common["code"] = getCode() || "";

  const { quizId, isCorrect } = props;
  return await api.post(`/quizzes/${quizId}/solve`, { isCorrect });
};
