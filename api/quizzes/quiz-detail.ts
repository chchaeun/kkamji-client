import api from "../my-api";
import { getCode } from "../session-code";

interface Props {
  quizId: string;
}

export const fetchQuizDetail = async ({ quizId }: Props) => {
  api.defaults.headers.common["code"] = getCode() || "";

  const { data } = await api.get(`/quizzes/${quizId}`);
  return data;
};
