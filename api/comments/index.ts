import { authorizationHeader } from "../utils/authHeader";
import { getJwtToken } from "../utils/getJwtToken";
import { apiV1 } from "../utils/myApi";

import { CommentDeleteProps, CommentUpdateProps } from "./types";

const updateComment = async ({ requestData }: CommentUpdateProps) => {
  const { commentBody, quizId } = requestData;

  return await apiV1.post(`/quizzes/${quizId}/comments`, commentBody, {
    headers: authorizationHeader(getJwtToken()),
  });
};

const deleteComment = async ({ commentId }: CommentDeleteProps) => {
  await apiV1.delete(`/comments/${commentId}`, {
    headers: authorizationHeader(getJwtToken()),
  });
};

export { updateComment, deleteComment };
