import { authorizationHeader } from "../authHeader";
import { api } from "../myApi";
import { CommentDeleteProps, CommentProps, CommentUpdateProps } from "./types";

const fetchComments = async ({ quizId }: CommentProps) => {
  const { data } = await api.get(
    `/quizzes/${quizId}/comments`,
    authorizationHeader
  );
  return data;
};

const updateComment = async ({ requestData }: CommentUpdateProps) => {
  const { commentBody, quizId } = requestData;

  return await api.post(
    `/quizzes/${quizId}/comments`,
    commentBody,
    authorizationHeader
  );
};

const deleteComment = async ({ commentId }: CommentDeleteProps) => {
  await api.delete(`/comments/${commentId}`, authorizationHeader);
};

export { fetchComments, updateComment, deleteComment };
