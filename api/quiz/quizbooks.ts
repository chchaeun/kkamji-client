import api from "../my-api";
import { getCode } from "../session-code";

export interface IQuizbook {
  quizbookId: number;
  quizbookTitle: string;
  quizbookDescription: string;
  numOfQuizzes: number;
  quizbookWeek: number;
  submitUserName: string;
}

export const fetchQuizbooks = async (week: string) => {
  api.defaults.headers.common["code"] = getCode() || "";

  const { data } = await api.get(`/quizbooks?week=${week}`);
  return data;
};
