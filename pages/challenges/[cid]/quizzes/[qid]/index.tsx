import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchQuizDetail } from "../../../../../api/quizzes/quiz-detail";
import { updateQuizScore } from "../../../../../api/quizzes/quiz-grade";
import { updateQuizIsSolved } from "../../../../../api/quizzes/quiz-solve";
import { fetchQuizzes } from "../../../../../api/quizzes/quizzes";
import CommentContainer from "../../../../../components/quiz/comment/comment-container";
import { classNames } from "../../../../../styles/classname-maker";
import {
  QuizDetail,
  QuizDetailSelect,
  QuizSummary,
} from "../../../../../types/Quiz";
type SolveValidForm = {
  solve: string;
};
function QuizDetailPage() {
  const [showAnswer, setShowAnswer] = useState(false);
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const quizId = String(router.query.qid);

  const queryClient = useQueryClient();

  const [rubricScore, setRubricScore] = useState<number>();

  const {
    register: solveRegister,
    handleSubmit: handleSolveSubmit,
    formState: { errors: solveErrors },
  } = useForm<SolveValidForm>();

  const { data: quizDetail, error } = useQuery<
    QuizDetail,
    AxiosError,
    QuizDetailSelect
  >(["quizDetail", quizId], () => fetchQuizDetail({ quizId }), {
    select: (quizDetail) => {
      return { ...quizDetail, quizRubric: JSON.parse(quizDetail.quizRubric) };
    },
    enabled: !!quizId,
  });
  const { data: quizzes } = useQuery<QuizSummary[]>(
    ["quizzes", challengeId],
    () => fetchQuizzes({ challengeId, week: quizDetail?.quizWeek || 0 }),
    {
      enabled: !!(challengeId && quizDetail),
    }
  );

  const { mutate: mutateQuizIsSolved } = useMutation(
    (answer: string) => updateQuizIsSolved({ quizId, answer }),
    {
      mutationKey: ["quizIsSolved", quizId],
      onMutate: () => {
        queryClient.invalidateQueries(["quizDetail", quizId]);
      },
    }
  );

  const { mutate: mutateQuizGrade } = useMutation((score: number) =>
    updateQuizScore({ quizId, score })
  );

  if (error) {
    if (error?.response?.status === 404) {
      return (
        <div className="flex w-full h-screen items-center justify-center">
          존재하지 않는 페이지입니다.
        </div>
      );
    }
  }

  const onSolveValid: SubmitHandler<SolveValidForm> = ({ solve }) => {
    mutateQuizIsSolved(solve);
  };

  const onAnswerClick = () => {
    if (quizDetail?.solveAnswer) {
      setShowAnswer((prev) => !prev);
    } else {
      alert("정답을 제출해야 열람할 수 있습니다.");
    }
  };

  const onEditClick = () => {
    router.push(`/challenges/${challengeId}/quizzes/${quizId}/edit`);
  };

  const onMoveQuizClick = (move: string) => {
    if (!quizzes) {
      return;
    }
    for (let i = 0; i < quizzes.length; i++) {
      if (String(quizzes[i].quizId) === quizId) {
        if (move === "prev" && i - 1 >= 0) {
          router.push(
            `/challenges/${challengeId}/quizzes/${quizzes[i - 1].quizId}`
          );
        } else if (move === "next" && i + 1 < quizzes.length) {
          router.push(
            `/challenges/${challengeId}/quizzes/${quizzes[i + 1].quizId}`
          );
        }
      }
    }
  };
  // 퀴즈가 첫 번째 혹은 마지막 순서인지 확인한다. 두 경우에는 각각 이전과 이후로 이동하지 못한다.
  const isDisabled = (move: string) => {
    if (!quizzes) {
      return;
    }

    for (let i = 0; i < quizzes.length; i++) {
      if (String(quizzes[i].quizId) === quizId) {
        if (move === "prev" && i == 0) {
          return true;
        } else if (move === "next" && i == quizzes.length - 1) {
          return true;
        }
      }
    }
    return false;
  };

  const onRubricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setRubricScore(Number(value));
  };

  const onGradeClick = () => {
    if (!rubricScore) {
      return;
    }
    mutateQuizGrade(rubricScore);
  };

  return (
    <div className="absolute top-0 w-full h-screen pt-32 px-20 sm:h-full sm:px-10 sm:mt-16 sm:pt-10">
      <div className="grid grid-cols-2 gap-10 h-5/6 sm:flex sm:flex-col sm:h-fit">
        <div className="h-full pr-4 pb-2 overflow-y-scroll">
          <div className="flex flex-col gap-10">
            <div className="flex justify-between items-center text-gray-700 text-sm">
              <h2 className="text-2xl">{quizDetail?.quizTitle}</h2>
              <span>작성자: {quizDetail?.writerName}</span>
            </div>
            <p className="flex flex-col gap-5 justify-between p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
              {quizDetail?.quizContent}{" "}
              {quizDetail?.quizFiles.map((quizFile) => (
                <img key={quizFile.id} src={quizFile.qfPath} width={500} />
              ))}
            </p>

            {!quizDetail?.solveAnswer ? (
              <form
                onSubmit={handleSolveSubmit(onSolveValid)}
                className="flex flex-col gap-8 pb-10 items-end"
              >
                <div className="flex flex-col w-full gap-2">
                  <label>
                    정답 입력
                    <textarea
                      {...solveRegister("solve", { required: true })}
                      className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </label>
                  {solveErrors.solve &&
                    solveErrors.solve.type === "required" && (
                      <em>답은 필수 입력값입니다.</em>
                    )}
                </div>

                <button
                  type="submit"
                  className="w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                >
                  제출
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl">내 정답</h2>
                <div className="p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                  {quizDetail?.solveAnswer}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-full pr-4 overflow-y-scroll">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <h2 className="text-2xl">정답</h2>
              <div className="flex gap-2">
                {quizDetail?.isMine && (
                  <button
                    onClick={onEditClick}
                    className="text-gray-700 underline"
                  >
                    수정
                  </button>
                )}
                <button
                  type="button"
                  onClick={onAnswerClick}
                  className="text-gray-700 underline"
                >
                  {showAnswer ? "닫기" : "열기"}
                </button>
              </div>
            </div>
            {showAnswer && (
              <>
                <p className="flex justify-between p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                  {quizDetail?.quizAnswer}
                </p>
                <div className="flex flex-col items-end gap-5">
                  <div className="w-full flex flex-col gap-3 ">
                    <h2 className="text-2xl">해설</h2>
                    <div className="p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                      {quizDetail?.quizExplanation}
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-3 items-end">
                    <h2 className="w-full text-2xl">채점</h2>
                    {quizDetail?.quizRubric?.map((rubric, index) => (
                      <div
                        key={index}
                        className="flex items-center w-full pl-4 bg-white rounded-lg shadow-sm border-[1px] border-gray-300"
                      >
                        <input
                          id={`bordered-radio-${index}`}
                          type="radio"
                          value={rubric.score}
                          name="bordered-radio"
                          className="w-4 h-4 text-[#5c3cde] bg-gray-100 border-gray-700"
                          onChange={onRubricChange}
                        />
                        <label
                          htmlFor={`bordered-radio-${index}`}
                          className="flex justify-between pr-3 py-4 ml-2 w-full text-sm font-medium text-gray-900"
                        >
                          <span>{rubric.content}</span>
                          <span>{rubric.score}점</span>
                        </label>
                      </div>
                    ))}
                    <button
                      onClick={onGradeClick}
                      className="bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    >
                      등록
                    </button>
                  </div>
                </div>
              </>
            )}
            <CommentContainer />
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-5 sm:justify-end sm:gap-3 sm:pr-5 sm:w-full sm:bg-white sm:fixed sm:bottom-0 sm:right-0">
        <button
          onClick={() => onMoveQuizClick("prev")}
          className={classNames(
            isDisabled("prev")
              ? "bg-gray-200 text-gray-700 cursor-default"
              : "bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold focus:outline-none focus:shadow-outline cursor-pointer",
            "py-2 px-4 mb-4 rounded"
          )}
        >
          이전
        </button>
        <button
          onClick={() => onMoveQuizClick("next")}
          className={classNames(
            isDisabled("next")
              ? "bg-gray-200 text-gray-700 cursor-default"
              : "bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold focus:outline-none focus:shadow-outline cursor-pointer",
            "py-2 px-4 mb-4 rounded"
          )}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default QuizDetailPage;
