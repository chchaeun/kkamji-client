import api from "../my-api";
import { getCode } from "../session-code";
import { IFetchChapter } from "../fetch-types";

export interface IQuizbook {
  quizbookId: number;
  quizbookTitle: string;
  quizbookDescription: string;
  numOfQuizzes: number;
  submitUserName: string;
}

export const fetchQuizbooks = async (idData: IFetchChapter) => {
  const { chapterId } = idData;

  api.defaults.headers.common["code"] = getCode() || "";

  const { data } = await api.get(`/chapters/${chapterId}/quizbooks`);
  return data;
};
