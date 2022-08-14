import api from "../my-api";
import { getCode } from "../session-code";
import { IFetchQuizbook } from "../fetch-types";

export interface IQuizbookDetail {
  quizbookId: number;
  quizbookTitle: string;
  quizbookDescription: string;
  numOfQuizzes: number;
  submitUserName: string;
}

export const fetchQuizbookDetail = async (idData: IFetchQuizbook) => {
  api.defaults.headers.common["code"] = getCode() || "";

  const { chapterId, quizbookId } = idData;
  const { data } = await api.get(
    `/chapters/${chapterId}/quizbooks/${quizbookId}`
  );
  return data;
};
