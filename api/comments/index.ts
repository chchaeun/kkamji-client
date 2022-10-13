import api from "../myApi";
import { getToken } from "../getToken";
import { CommentDeleteProps, CommentProps, CommentUpdateProps } from "./types";

const fetchComments = async ({ quizId }: CommentProps) => {
  api.defaults.headers.common["jwt"] = getToken();
  const { data } = await api.get(`/quizzes/${quizId}/comments`);
  return data;
};

const updateComment = async ({ requestData }: CommentUpdateProps) => {
  const { commentBody, quizId } = requestData;
  api.defaults.headers.common["jwt"] = getToken();
  return await api.post(`/quizzes/${quizId}/comments`, commentBody);
};

const deleteComment = async ({ commentId }: CommentDeleteProps) => {
  api.defaults.headers.common["jwt"] = getToken();

  await api.delete(`/comments/${commentId}`);
};

export { fetchComments, updateComment, deleteComment };
