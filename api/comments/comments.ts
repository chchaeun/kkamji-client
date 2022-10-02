import api from "../my-api";
import { getCode } from "../session-code";
interface Props {
  quizId: string;
}
export const fetchComments = async ({ quizId }: Props) => {
  api.defaults.headers.common["code"] = getCode();
  const { data } = await api.get(`/quizzes/${quizId}/comments`);
  return data;
};
