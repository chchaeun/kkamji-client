import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchComments } from "../../../api/comments/comments";
import { updateComment } from "../../../api/comments/update-comment";
import api from "../../../api/my-api";
import { Comment } from "../../../types/Comment";
import { getDateFormat } from "../../../utils/date-fotmat";
type CommentValidForm = {
  comment: string;
};

function CommentContainer() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showComment, setShowComment] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const quizId = String(router.query.qid);

  const { register, handleSubmit, resetField } = useForm<CommentValidForm>();

  const { data: comments } = useQuery<Comment[]>(
    ["comments", quizId],
    () => fetchComments({ quizId }),
    {
      enabled: !!router.query.qid,
    }
  );

  const { mutate: mutateCommentSubmit } = useMutation(
    (commentBody: { content: string }) =>
      updateComment({ requestData: { commentBody, quizId } }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", quizId]);
        resetField("comment");
        setDisabledSubmit(false);
      },
      onError: (err) => {
        queryClient.invalidateQueries(["comments", quizId]);
        resetField("comment");
      },
      onMutate: () => {
        setDisabledSubmit(true);
      },
    }
  );

  const { mutate: mutateCommentDelete } = useMutation(
    async (commentId: number) => await api.delete(`/comments/${commentId}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["comments", quizId]);
      },
    }
  );

  const onCommentOpenClick = () => {
    setShowComment((prev) => !prev);
  };

  const onCommentValid = ({ comment }: CommentValidForm) => {
    if (disabledSubmit) {
      return;
    }
    const commentBody = {
      content: comment,
    };
    mutateCommentSubmit(commentBody);
  };

  const onDeleteClick = async (commentId: number) => {
    mutateCommentDelete(commentId);
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
            <form
              onSubmit={handleSubmit(onCommentValid)}
              className="flex flex-col gap-4 pb-10 items-end"
            >
              <textarea
                rows={3}
                {...register("comment", { required: true })}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="submit"
                className="flex items-center w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                disabled={disabledSubmit}
              >
                {disabledSubmit && (
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-4 h-4 text-gray-200 animate-spin fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
                작성
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-6">
            {comments?.map((comment) => (
              <div key={comment.commentId} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <span className="text-base font-semibold">
                      {comment.writerName}
                    </span>
                    {comment.isQuizWriter && (
                      <span className="text-sm text-[#5c3cde]">작성자</span>
                    )}
                  </div>
                  {comment.isMine && (
                    <button
                      type="button"
                      onClick={() => onDeleteClick(comment.commentId)}
                      className="text-sm text-gray-700 hover:underline"
                    >
                      삭제
                    </button>
                  )}
                </div>

                <p>
                  {comment.commentContent?.split("\n").map((content, index) => (
                    <span key={index}>
                      {content}
                      <br />
                    </span>
                  ))}
                </p>
                <span className="text-sm text-gray-600">
                  {getDateFormat(comment.commentCreatedDate)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CommentContainer;
