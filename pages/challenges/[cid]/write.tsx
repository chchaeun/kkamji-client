import React, { Fragment, useRef, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { updateQuiz } from "../../../api/submit-quiz/update-quiz";
import Overlay from "../../../components/layout/OverlayComponent";
import SubmitCount from "../../../components/write/blocks/SubmitCount";
import useCurrentWeekQuery from "../../../hooks/current-week-query";
import useSubmitCountQuery from "../../../hooks/submit-count-query";
import { Icon } from "@iconify/react";
import useChallengeDetailQuery from "../../../hooks/challenge-detail-query";
import SubmitSuccessModal from "../../../components/write/blocks/SubmitSuccessModal";
import HeadTitle from "../../../components/common/Title";

type QuizValidForm = {
  title: string;
  content: string;
  image: FileList;
  answer: string;
  explanation: string;
  rubric: {
    score: string;
    content: string;
  }[];
};
function QuizWritePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const challengeId = String(router.query.cid);

  const [submitSuccessModalOpen, setSubmitSuccessModalOpen] = useState(false);

  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<QuizValidForm>({
    defaultValues: {
      rubric: [
        {
          score: "",
          content: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray<QuizValidForm>({
    control,
    name: "rubric",
  });

  const imageRef = useRef<FileList | null>(null);
  imageRef.current = watch("image");

  const { mutate: mutateQuizSubmit } = useMutation(
    (quizSubmitBody: FormData) => updateQuiz({ challengeId, quizSubmitBody }),
    {
      onSuccess: () => {
        setSubmitSuccessModalOpen(true);
        setDisabledSubmit(false);
        reset();
        queryClient.invalidateQueries(["quizCurrentSubmit"]);
      },
      onMutate: () => {
        setDisabledSubmit(true);
      },
      retryDelay: 3000,
    }
  );

  const { data: currentWeek } = useCurrentWeekQuery({ challengeId });
  const { data: submitCount } = useSubmitCountQuery({
    challengeId,
    week: currentWeek || 0,
  });

  const onQuizSubmitValid: SubmitHandler<QuizValidForm> = async ({
    title,
    content,
    image,
    answer,
    explanation,
    rubric,
  }) => {
    if (disabledSubmit) {
      return;
    }

    const quizSubmitFormData = new FormData();

    const createQuizRequest = {
      quizTitle: title,
      quizContent: content,
      quizAnswer: answer,
      quizExplanation: explanation,
      quizRubric: JSON.stringify(rubric),
    };

    quizSubmitFormData.append(
      "createQuizRequest",
      new Blob([JSON.stringify(createQuizRequest)], {
        type: "application/json",
      })
    );
    quizSubmitFormData.append("quizFiles", image[0]);

    mutateQuizSubmit(quizSubmitFormData);
  };

  const onCloseClick = () => {
    router.push(`/challenges/${challengeId}`);
  };

  const { data: challengeDetail, error } = useChallengeDetailQuery({
    challengeId,
  });

  if (error || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }
  return (
    <>
      <HeadTitle name="문제 작성 : 깜지" />
      <div className="grid grid-cols-5 gap-4 w-full h-full m-auto sm:flex sm:flex-col-reverse py-[80px] px-[10px] sm:py-[88px] sm:px-[12px]">
        {currentWeek && <SubmitCount currentWeek={currentWeek} />}
        <div className="flex flex-col h-full col-span-3 col-start-2 gap-10 px-20 py-10 bg-white sm:gap-7 sm:w-4/5 sm:m-auto sm:px-0 sm:pt-0">
          <h1 className="text-2xl">문제 제출</h1>
          <form
            onSubmit={handleSubmit(onQuizSubmitValid)}
            className="flex flex-col items-end gap-8 pb-10"
          >
            <div className="flex flex-col w-full gap-2">
              <label>
                제목을 입력하세요. (키워드)
                <input
                  type="text"
                  {...register("title", {
                    required: "제목은 필수 입력값입니다.",
                    maxLength: {
                      value: 50,
                      message: "제목은 50자 이하여야 합니다.",
                    },
                  })}
                  className="w-full px-3 py-2 mt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </label>
              <em>{errors.title?.message}</em>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label>
                문제 내용을 입력하세요.
                <textarea
                  rows={5}
                  {...register("content", {
                    required: "문제 내용은 필수 입력값입니다.",
                    maxLength: {
                      value: 3500,
                      message: "내용은 3500자 이하여야 합니다.",
                    },
                  })}
                  className="w-full px-3 py-2 mt-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
              <div className="grid w-full grid-cols-12 gap-2 sm:grid-cols-6">
                <label>점수</label>
                <label className="col-span-2">채점 기준</label>
              </div>
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
              className={
                "flex items-center w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline cursor-pointer"
              }
              disabled={disabledSubmit}
            >
              {disabledSubmit && (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-white"
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
              제출
            </button>
          </form>
        </div>
        {submitSuccessModalOpen && submitCount && (
          <Fragment>
            {currentWeek && <SubmitSuccessModal week={currentWeek} />}
            <Overlay onClick={onCloseClick} />
          </Fragment>
        )}
      </div>
    </>
  );
}

export default QuizWritePage;
