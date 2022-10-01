import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import api from "../../../api/my-api";
import { Comment } from "../../../types/Comment";
import { getDateFormat } from "../../../utils/DateFormat";
interface Props {
  quizId: string;
  comment: Comment;
}
function QuizComment({ quizId, comment }: Props) {
  const queryClient = useQueryClient();
  const {
    commentId,
    commentContent,
    commentCreatedDate,
    isMine,
    isQuizWriter,
    writerName,
  } = comment;

  const { mutate: mutateCommentDelete } = useMutation(
    async (commentId: number) => await api.delete(`/comments/${commentId}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["comments", quizId]);
      },
    }
  );

  const onDeleteClick = async (commentId: number) => {
    mutateCommentDelete(commentId);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="text-base font-semibold">{writerName}</span>
          {isQuizWriter && (
            <span className="text-sm text-[#5c3cde]">작성자</span>
          )}
        </div>
        {isMine && (
          <button
            type="button"
            onClick={() => onDeleteClick(commentId)}
            className="text-sm text-gray-700 hover:underline"
          >
            삭제
          </button>
        )}
      </div>

      <p>
        {commentContent?.split("\n").map((content, index) => (
          <span key={index}>
            {content}
            <br />
          </span>
        ))}
      </p>
      <span className="text-sm text-gray-600">
        {getDateFormat(commentCreatedDate)}
      </span>
    </div>
  );
}

export default QuizComment;
