import api from "../my-api";
import { getCode } from "../session-code";

export interface IQuizbookDetail {
  quizbookId: number;
  quizbookTitle: string;
  quizbookDescription: string;
  quizbookWeek: number;
  numOfQuizzes: number;
  submitUserName: string;
  quizSummaries: {
    quizId: number;
    quizTitle: string;
    quizCategory: string;
    quizIsSolved: boolean;
  }[];
}

export const fetchQuizbookDetail = async (quizbookId: string) => {
  api.defaults.headers.common["code"] = getCode() || "";

  const { data } = await api.get(`/quizbooks/${quizbookId}`);
  return data;
};
