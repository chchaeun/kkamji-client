import api from "../my-api";
import { getCode } from "../session-code";
import { CommentDeleteProps, CommentProps, CommentUpdateProps } from "./types";

const fetchComments = async ({ quizId }: CommentProps) => {
  api.defaults.headers.common["code"] = getCode();
  const { data } = await api.get(`/quizzes/${quizId}/comments`);
  return data;
};

const updateComment = async ({ requestData }: CommentUpdateProps) => {
  const { commentBody, quizId } = requestData;
  api.defaults.headers.common["code"] = getCode();
  return await api.post(`/quizzes/${quizId}/comments`, commentBody);
};

const deleteComment = async ({ commentId }: CommentDeleteProps) => {
  api.defaults.headers.common["code"] = getCode();

  await api.delete(`/comments/${commentId}`);
};

export { fetchComments, updateComment, deleteComment };
