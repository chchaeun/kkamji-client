import api from "../my-api";
import { getCode } from "../session-code";

export interface IQuizAnswer {
  quizId: number;
  quizAnswer: string;
  quizExplanation: string;
  quizSource: string;
}

export const fetchQuizAnswer = async (quizId: string) => {
  api.defaults.headers.common["code"] = getCode() || "";

  const { data } = await api.get(`/quizzes/${quizId}/answer`);
  return data;
};
