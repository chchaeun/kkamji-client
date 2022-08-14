import { IFetchQuiz } from "../fetch-types";
import api from "../my-api";
import { getCode } from "../session-code";

export interface Comments {
  commentId: number;
  commentUserName: string;
  commentContent: string;
  createdDate: string;
  modifiedDate: string;
  isMine: boolean;
}

export const fetchComments = async ({ quizId }: IFetchQuiz) => {
  api.defaults.headers.common["code"] = getCode() || "";
  const { data } = await api.get(`/quizzes/${quizId}/comments`);
  return data;
};
