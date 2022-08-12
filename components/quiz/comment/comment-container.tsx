import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { getCode } from "../../../api/session-code";
type CommentValidForm = {
  comment: string;
};

interface IComment {
  commentId: number;
  commentUserName: string;
  commentContent: string;
  createdDate: string;
  modifiedDate: string;
  isMine: boolean;
  isWriter: boolean;
}

function CommentContainer() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const quizbookId = String(router.query.qbid);
  const quizId = String(router.query.qid);

  const { register, handleSubmit } = useForm<CommentValidForm>();

  const { data: comments } = useQuery<IComment[]>(["comments"], async () => {
    const { data } = await axios.get(
      `https://a61e9270-0366-4013-a651-fbc3d46384ab.mock.pstmn.io/v1/quizbooks/${quizbookId}/quizzes/${quizId}/comments`,
      {
        headers: {
          code: String(getCode()),
        },
      }
    );
    return data;
  });

  const { mutate: mutateCommentSubmit } = useMutation(
    async (commentBody: { commentContent: string }) => {
      return await axios.post(
        `https://a61e9270-0366-4013-a651-fbc3d46384ab.mock.pstmn.io/v1/quizbooks/${quizbookId}/quizzes/${quizId}/comments`,
        commentBody,
        {
          headers: {
            code: String(getCode()),
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([""]);
      },
    }
  );

  const onCommentValid = ({ comment }: CommentValidForm) => {
    const commentBody = { commentContent: comment };
    mutateCommentSubmit(commentBody);
  };

  const onDeleteClick = async (commentId: number) => {
    await axios.delete(
      `https://a61e9270-0366-4013-a651-fbc3d46384ab.mock.pstmn.io/v1/quizbooks/{quizbookId}/quizzes/{quizId}/comments/{commentId}`
    );
  };

  const getDateFormat = (date: string) => {
    const nowTime = new Date().getTime();
    const dateFormat = new Date(date);
    const timeGap = nowTime - dateFormat.getTime();

    const oneDaytoMs = 1000 * 60 * 60 * 24;
    const threeDaytoMs = oneDaytoMs * 3;
    if (timeGap < oneDaytoMs) {
      return `${dateFormat.getHours()}:${dateFormat.getMinutes()}`;
    } else if (timeGap >= oneDaytoMs && timeGap < threeDaytoMs) {
      return `${Math.floor(timeGap / oneDaytoMs)}일 전`;
    } else {
      return `${dateFormat.getFullYear()}년 ${
        dateFormat.getMonth() + 1
      }월 ${dateFormat.getDate()}일`;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h2 className="text-2xl">의견</h2>
        </div>
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
              className="w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              작성
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {comments?.map((comment) => (
          <div key={comment.commentId} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <span className="text-base font-semibold">
                  {comment.commentUserName}
                </span>

                {comment.isWriter && (
                  <span className="text-sm text-[#5c3cde]">작성자</span>
                )}
              </div>
              {comment.isMine && (
                <button
                  type="button"
                  onClick={() => onDeleteClick(comment.commentId)}
                  className="text-sm text-gray-700"
                >
                  삭제
                </button>
              )}
            </div>

            <p>
              {comment.commentContent.split("\n").map((content, index) => (
                <span key={index}>
                  {content}
                  <br />
                </span>
              ))}
            </p>
            <span className="text-sm text-gray-600">
              {comment.modifiedDate
                ? `${getDateFormat(comment.modifiedDate)} • 수정됨`
                : getDateFormat(comment.createdDate)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentContainer;
