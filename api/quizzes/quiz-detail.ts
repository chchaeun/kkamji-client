import api from "../my-api";
import { getCode } from "../session-code";
import { IFetchQuiz } from "../fetch-types";

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

export const fetchQuizDetail = async (idData: IFetchQuiz) => {
  const { chapterId, quizbookId, quizId } = idData;

  api.defaults.headers.common["code"] = getCode() || "";

  const { data } = await api.get(
    `/chapters/${chapterId}/quizbooks/${quizbookId}quizzes/${quizId}`
  );
  return data;
};
