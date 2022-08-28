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
import { QuizDetail, QuizSummary } from "../../../../../types/Quiz";
type SolveValidForm = {
  solve: string;
};
type GradeValidForm = {
  score: string;
};
function QuizDetailPage() {
  const [showAnswer, setShowAnswer] = useState(false);
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const quizId = String(router.query.qid);

  const queryClient = useQueryClient();

  const {
    register: solveRegister,
    handleSubmit: handleSolveSubmit,
    formState: { errors: solveErrors },
  } = useForm<SolveValidForm>();

  const {
    register: gradeRegister,
    handleSubmit: handleGradeSubmit,
    formState: { errors: gradeErrors },
  } = useForm<GradeValidForm>();

  const { data: quizDetail, error } = useQuery<QuizDetail, AxiosError>(
    ["quizDetail", quizId],
    () => fetchQuizDetail({ quizId }),
    {
      enabled: !!quizId,
    }
  );

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

  const onGradeValid: SubmitHandler<GradeValidForm> = ({ score }) => {
    mutateQuizGrade(Number(score));
  };

  const onAnswerClick = () => {
    setShowAnswer((prev) => !prev);
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

  return (
    <div className="grid grid-cols-5 gap-4 w-full lg:mt-10 m-auto sm:flex sm:flex-col sm:px-10">
      <div className="col-start-2 col-span-3 flex flex-col gap-10 py-10 sm:h-screen sm:justify-between sm:py-20">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center text-gray-700 text-sm">
            <h2 className="text-2xl">{quizDetail?.quizTitle}</h2>
            <span>작성자: {quizDetail?.writerName}</span>
          </div>

          <p className="flex flex-col gap-5 justify-between bg-white p-5 drop-shadow-md">
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
                {solveErrors.solve && solveErrors.solve.type === "required" && (
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
              <div className="bg-white p-5 drop-shadow-md">
                {quizDetail?.solveAnswer}
              </div>
            </div>
          )}
        </div>
        {quizDetail?.solveAnswer && (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <h2 className="text-2xl">정답</h2>
              <button
                type="button"
                onClick={onAnswerClick}
                className="text-gray-700 underline"
              >
                {showAnswer ? "닫기" : "열기"}
              </button>
            </div>
            {showAnswer && (
              <>
                <p className="flex justify-between bg-white p-5 drop-shadow-md">
                  {quizDetail?.quizAnswer}
                </p>
                <div className="flex flex-col items-end gap-5">
                  <div className="w-full flex flex-col gap-3">
                    <h2 className="text-2xl">해설</h2>
                    <div className="bg-white p-5 drop-shadow-md">
                      {quizDetail?.quizExplanation}
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <h2 className="text-2xl">루브릭</h2>
                    <div className="bg-white p-5 drop-shadow-md">
                      {quizDetail?.quizRubric}
                    </div>
                  </div>
                  {quizDetail?.isMine && (
                    <button
                      onClick={onEditClick}
                      className="w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    >
                      수정
                    </button>
                  )}
                </div>
                {!quizDetail.solveScore && (
                  <form
                    onSubmit={handleGradeSubmit(onGradeValid)}
                    className="flex gap-2 w-1/2 pb-10 items-center"
                  >
                    <label htmlFor="score">셀프 채점</label>
                    <input
                      {...gradeRegister("score", { required: true })}
                      id="score"
                      className="shadow appearance-none border rounded mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <span>점</span>
                    <button
                      type="submit"
                      className="w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 text-sm rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    >
                      제출
                    </button>
                    {gradeErrors.score &&
                      gradeErrors.score.type === "required" && (
                        <em>답은 필수 입력값입니다.</em>
                      )}
                  </form>
                )}
                <CommentContainer />
              </>
            )}
          </div>
        )}
        {quizzes && (
          <div className="flex justify-between sm:justify-end sm:gap-3">
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
        )}
      </div>
    </div>
  );
}

export default QuizDetailPage;
