import { IFetchQuiz } from "../fetch-types";
import api from "../my-api";
import { getCode } from "../session-code";

export const fetchComments = async ({ quizId }: IFetchQuiz) => {
  api.defaults.headers.common["code"] = getCode() || "";
  const { data } = await api.get(`/quizzes/${quizId}/comments`);
  return data;
};
