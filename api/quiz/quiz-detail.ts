import api from "../my-api";
import { getCode } from "../session-code";

export interface IQuizDetail {
  quizbookId: number;
  quizbookTitle: string;
  quizbookWeek: number;
  submitUserName: string;
  quizId: number;
  quizTitle: string;
  quizContent: string;
  quizCategory: string;
}

export const fetchQuizDetail = async (quizId: string) => {
  api.defaults.headers.common["code"] = getCode() || "";

  const { data } = await api.get(`/quizzes/${quizId}/content`);
  return data;
};
