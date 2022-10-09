import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { fetchComments } from "../../../api/comments";
import { Comment } from "../../../types/Comment";
import QuizComment from "../blocks/QuizComment";
import QuizCommentForm from "../blocks/QuizCommentForm";

interface Props {
  quizId: string;
}

function QuizCommentContainer({ quizId }: Props) {
  const router = useRouter();

  const [showComment, setShowComment] = useState(false);

  const { data: comments } = useQuery<Comment[]>(
    ["comments", quizId],
    () => fetchComments({ quizId }),
    {
      enabled: !!router.query.qid,
    }
  );

  const onCommentOpenClick = () => {
    setShowComment((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h2 className="text-xl">의견</h2>
          <button
            type="button"
            onClick={onCommentOpenClick}
            className="text-gray-700 underline"
          >
            {showComment ? "닫기" : "열기"}
          </button>
        </div>
      </div>
      {showComment && (
        <>
          <div className="flex flex-col w-full gap-2">
            <QuizCommentForm quizId={quizId} />
          </div>
          <div className="flex flex-col gap-6">
            {comments?.map((comment) => (
              <QuizComment
                quizId={quizId}
                comment={comment}
                key={comment.commentId}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default QuizCommentContainer;
