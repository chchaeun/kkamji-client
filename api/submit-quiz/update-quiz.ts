import api from "../my-api";
import { getCode } from "../session-code";

interface Props {
  challengeId: string;
  quizSubmitBody: FormData;
}

export const updateQuiz = async ({ challengeId, quizSubmitBody }: Props) => {
  api.defaults.headers.common["code"] = getCode();
  api.defaults.headers.common["Content-Type"] = "multipart/form-data";
  return await api.post(`/challenges/${challengeId}/quizzes`, quizSubmitBody);
};
