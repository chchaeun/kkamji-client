import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import api from "../../../../../api/my-api";
import useChallengeDetailQuery from "../../../../../hooks/challenge-detail-query";
import useOpenWeeksQuery from "../../../../../hooks/open-weeks";
import {
  MyQuizDetail,
  MyQuizDetailSelect,
  QuizEdit,
} from "../../../../../types/Quiz";

type EditValidForm = {
  answer: string;
  explanation: string;
  rubric: {
    score: number;
    content: string;
  }[];
};

function QuizAnswerEdit() {
  const router = useRouter();
  const quizId = String(router.query.qid);
  const challengeId = String(router.query.cid);
  const { data: openWeeks } = useOpenWeeksQuery();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditValidForm>({
    defaultValues: {},
  });

  const {
    data: quizDetail,
    error,
    isLoading,
  } = useQuery<MyQuizDetail, AxiosError, MyQuizDetailSelect>(
    ["quizDetail", quizId],
    async () => {
      const { data } = await api.get(`/my/quizzes/${quizId}`);
      return data;
    },
    {
      select: (quizDetail) => {
        return { ...quizDetail, quizRubric: JSON.parse(quizDetail.quizRubric) };
      },
      enabled: !!router.query.qid,
      onSuccess: (data) => {
        reset({
          answer: data.quizAnswer,
          explanation: data.quizExplanation,
          rubric: data.quizRubric,
        });
      },
      onError: (err) => {},
    }
  );

  const { data: challengeDetail, error: challengeError } =
    useChallengeDetailQuery({ challengeId });
  const { fields, append, remove } = useFieldArray<EditValidForm>({
    control,
    name: "rubric",
  });

  const { mutate: mutateAnswerEdit } = useMutation(
    async (editBody: QuizEdit) => {
      return await api.patch(`/quizzes/${quizId}`, editBody);
    },
    {
      onSuccess: () => {
        router.push(
          `${router.asPath.split("/edit")[0]}?week=${openWeeks!.weeks
            .filter((week) => week.status === "READABLE")
            .map((week) => week.week)
            .join(",")}`
        );
      },
      retryDelay: 3000,
    }
  );

  const onEditValid: SubmitHandler<EditValidForm> = ({
    answer,
    explanation,
    rubric,
  }) => {
    const editBody = {
      quizAnswer: answer,
      quizExplanation: explanation,
      quizRubric: JSON.stringify(rubric),
    };
    mutateAnswerEdit(editBody);
  };

  const contentsFormat = (contents: string) => {
    return (
      <p>
        {contents
          .replaceAll("\t", "\u00a0 \u00a0 \u00a0 \u00a0")
          .split("\n")
          .map((content) => (
            <>
              {content}
              <br />
            </>
          ))}
      </p>
    );
  };

  if (challengeError || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        접근 권한이 없습니다.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-5 gap-4 w-full m-auto sm:flex sm:flex-col  py-[80px] px-[10px] sm:py-[88px] sm:px-[12px]">
      <div className="flex flex-col col-span-3 col-start-2 gap-8 py-10 sm:h-screen sm:justify-between sm:py-20">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl">{quizDetail?.quizTitle}</h2>
          <div className="p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
            {quizDetail?.quizContent && contentsFormat(quizDetail?.quizContent)}
          </div>
        </div>

        {quizDetail && (
          <form
            onSubmit={handleSubmit(onEditValid)}
            className="flex flex-col items-end gap-8 pb-10"
          >
            <div className="flex flex-col w-full gap-2">
              <label>
                정답을 입력하세요.
                <textarea
                  {...register("answer", {
                    required: "정답은 필수 입력값입니다.",
                    maxLength: {
                      value: 3500,
                      message: "정답은 3500자 이하여야 합니다.",
                    },
                  })}
                  className="w-full px-3 py-2 mt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </label>
              <em>{errors.answer?.message}</em>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label>
                해설을 입력하세요.
                <textarea
                  rows={5}
                  {...register("explanation", {
                    required: "해설은 필수 입력값입니다.",
                    maxLength: {
                      value: 3500,
                      message: "해설은 3500자 이하여야 합니다.",
                    },
                  })}
                  className="w-full px-3 py-2 mt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </label>
              <em>{errors.explanation?.message}</em>
            </div>
            <div className="w-full">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid w-full grid-cols-12 gap-x-2 sm:grid-cols-6"
                >
                  <input
                    {...register(`rubric.${index}.score`, {
                      required: "점수는 필수 입력값입니다.",
                    })}
                    className="px-3 py-2 mt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
                  <input
                    {...register(`rubric.${index}.content`, {
                      required: "채점 기준은 필수 입력값입니다.",
                    })}
                    className="col-span-10 px-3 py-2 mt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline sm:col-span-4"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="flex items-center px-1 text-3xl"
                  >
                    <Icon
                      icon="akar-icons:circle-minus-fill"
                      color={"#9686dc"}
                    />
                  </button>
                </div>
              ))}
              <em className="block py-3">
                {errors.rubric && errors.rubric[0]?.score?.message}
              </em>
              <em className="block">
                {errors.rubric && errors.rubric[0]?.content?.message}
              </em>
              <div className="flex justify-center w-full p-5 text-3xl sm:pt-0">
                <button
                  type="button"
                  onClick={() => {
                    append({});
                  }}
                >
                  <Icon icon="akar-icons:circle-plus-fill" color={"#9686dc"} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              수정
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default QuizAnswerEdit;
