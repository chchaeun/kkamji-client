import React, { Fragment, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { getCode } from "../../../api/session-code";
import CurrentSubmit from "../../../components/quiz/submit/submit-count";
import SubmitSuccessModal from "../../../components/quiz/submit/submit-success-modal";
import Overlay from "../../../components/layout/overlay";
import { updateQuiz } from "../../../api/submit-quiz/update-quiz";
import { fetchSubmitCount } from "../../../api/submit-quiz/submit-count";
import SubmitCount from "../../../components/quiz/submit/submit-count";
import { fetchCurrentWeek } from "../../../api/challenges/current-week";
import { CurrentWeek } from "../../../types/Challenge";
import useCurrentWeekQuery from "../../../hooks/current-week-query";

type QuizValidForm = {
  title: string;
  content: string;
  image: FileList;
  answer: string;
  explanation: string;
  rubric: string;
};
function QuizWritePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const challengeId = String(router.query.cid);

  const [submitSuccessModalOpen, setSubmitSuccessModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuizValidForm>();

  const imageRef = useRef<FileList | null>(null);
  imageRef.current = watch("image");

  const { mutate: mutateQuizSubmit } = useMutation(
    (quizSubmitBody: FormData) => updateQuiz({ challengeId, quizSubmitBody }),
    {
      onSuccess: () => {
        setSubmitSuccessModalOpen(true);
        queryClient.invalidateQueries(["quizCurrentSubmit"]);
      },
    }
  );

  const { data: currentWeek } = useCurrentWeekQuery();

  const { data: quizSubmitCount } = useQuery<{ currentSubmit: number }>(
    ["quizSubmitCount"],
    () => fetchSubmitCount({ challengeId, week: currentWeek?.week || 0 }),
    {
      enabled: !!(challengeId && currentWeek),
    }
  );
  const onQuizSubmitValid: SubmitHandler<QuizValidForm> = async ({
    title,
    content,
    image,
    answer,
    explanation,
    rubric,
  }) => {
    const quizSubmitFormData = new FormData();

    const createQuizRequest = {
      quizTitle: title,
      quizContent: content,
      quizAnswer: answer,
      quizExplanation: explanation,
      quizRubric: rubric,
    };

    quizSubmitFormData.append(
      "createQuizRequest",
      JSON.stringify(createQuizRequest)
    );
    quizSubmitFormData.append("quizFiles", image[0]);
    mutateQuizSubmit(quizSubmitFormData);
  };

  const onCloseClick = () => {
    router.push(`/challenges/${challengeId}`);
  };

  return (
    <div className="grid grid-cols-5 gap-4 w-full m-auto sm:flex sm:flex-col">
      {quizSubmitCount?.currentSubmit && (
        <SubmitCount quizSubmitCount={quizSubmitCount?.currentSubmit} />
      )}
      <div className="col-start-2 col-span-3 flex flex-col gap-10 sm:gap-7 sm:w-4/5 h-screen bg-white py-10 px-20 sm:m-auto sm:px-0 sm:py-20">
        <h1 className="text-2xl">문제 제출</h1>
        <form
          onSubmit={handleSubmit(onQuizSubmitValid)}
          className="flex flex-col gap-8 pb-10 items-end"
        >
          <div className="flex flex-col w-full gap-2">
            <label>
              제목을 입력하세요. (키워드)
              <input
                type="text"
                {...register("title", {
                  required: "제목은 필수 입력값입니다.",
                })}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <em>{errors.title?.message}</em>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>
              문제 내용을 입력하세요.
              <span>* 객관식의 경우 보기도 같이 입력해주세요.</span>
              <textarea
                rows={5}
                {...register("content", {
                  required: "문제 내용은 필수 입력값입니다.",
                })}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <em>{errors?.content?.message}</em>
            <div className="flex items-center w-full gap-3">
              <label
                htmlFor="upload-image"
                className="w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-sm font-bold text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              >
                이미지 첨부
              </label>
              {imageRef.current?.length > 0 && (
                <span>{imageRef.current[0].name}</span>
              )}
            </div>

            <input
              type="file"
              id="upload-image"
              accept="image/*"
              className="hidden"
              {...register("image")}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>
              정답을 입력하세요.
              <textarea
                {...register("answer", {
                  required: "정답은 필수 입력값입니다.",
                })}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                })}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>

            <em>{errors.explanation?.message}</em>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>
              채점 기준 (10점 만점)
              <span>* 예: </span>
              <textarea
                {...register("rubric", {
                  required: "채점 기준은 필수 입력값입니다.",
                })}
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <em>{errors.rubric?.message}</em>
          </div>
          <button
            type="submit"
            className="w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            제출
          </button>
        </form>
      </div>
      {submitSuccessModalOpen && quizSubmitCount?.currentSubmit && (
        <Fragment>
          <SubmitSuccessModal
            quizSubmitCount={quizSubmitCount?.currentSubmit}
          />
          <Overlay onClick={onCloseClick} />
        </Fragment>
      )}
    </div>
  );
}

export default QuizWritePage;
