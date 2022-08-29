import api from "../my-api";
import { getCode } from "../session-code";
import { IFetchQuizbook } from "../fetch-types";

export const fetchQuizzes = async (idData: IFetchQuizbook) => {
  const { chapterId, quizbookId } = idData;

  api.defaults.headers.common["code"] = getCode() || "";

  const { data } = await api.get(
    `/chapters/${chapterId}/quizbooks/${quizbookId}/quizzes`
  );
  return data;
};
