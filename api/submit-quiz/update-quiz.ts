import { IFetchChapter } from "../fetch-types";
import api from "../my-api";
import { getCode } from "../session-code";

export const updateQuiz = async (requestData: {
  chapterId: string;
  quizSubmitBody: FormData;
}) => {
  const { chapterId, quizSubmitBody } = requestData;
  api.defaults.headers.common["code"] = getCode() || "";
  api.defaults.headers.common["Content-Type"] = "multipart/form-data";
  return await api.post(`/chapters/${chapterId}/quizzes`, quizSubmitBody);
};
