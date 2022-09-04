import api from "../my-api";
import { getCode } from "../session-code";

interface RequestData {
  requestData: {
    commentBody: {
      content: string;
    };
    quizId: string;
  };
}

export const updateComment = async ({ requestData }: RequestData) => {
  const { commentBody, quizId } = requestData;
  api.defaults.headers.common["code"] = getCode();
  return await api.post(`/quizzes/${quizId}/comments`, commentBody);
};
