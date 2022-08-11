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
  commentContent: string;
}

function CommentContainer() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const quizbookId = String(router.query.qbid);
  const quizId = String(router.query.qid);

  const { register, handleSubmit } = useForm<CommentValidForm>();

  const { data: comments } = useQuery(["comments"], async () => {
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

  console.log(comments);

  const { mutate: mutateCommentSubmit } = useMutation(
    async (commentBody: IComment) => {
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
    </div>
  );
}

export default CommentContainer;
