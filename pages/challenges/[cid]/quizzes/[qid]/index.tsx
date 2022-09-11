import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateQuizScore } from "../../../../../api/quizzes/quiz-grade";
import { updateQuizIsSolved } from "../../../../../api/quizzes/quiz-solve";
import { fetchQuizzes } from "../../../../../api/quizzes/quizzes";
import CommentContainer from "../../../../../components/quizzes/comment/comment-container";
import QuizDetailNav from "../../../../../components/quizzes/quiz/quiz-detail-nav";
import QuizRate from "../../../../../components/quizzes/rate/quiz-rate";
import useChallengeDetailQuery from "../../../../../hooks/challenge-detail-query";
import useQuizDetailQuery from "../../../../../hooks/quiz-detail";
import { QuizSummary } from "../../../../../types/Quiz";

type SolveValidForm = {
  solve: string;
};

function QuizDetailPage() {
  const [showAnswer, setShowAnswer] = useState(false);
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const quizId = String(router.query.qid);
  const week = String(router.query.week);

  const queryClient = useQueryClient();
  const [rubricScore, setRubricScore] = useState<number>();

  const {
    register: solveRegister,
    handleSubmit: handleSolveSubmit,
    formState: { errors: solveErrors },
  } = useForm<SolveValidForm>();

  const { data: quizDetail, error } = useQuizDetailQuery();
  const { data: quizzes } = useQuery<QuizSummary[]>(
    ["quizzes", challengeId],
    () => fetchQuizzes({ challengeId, week }),
    {
      enabled: !!(router.query.cid && quizDetail),
    }
  );

  const { mutate: mutateQuizIsSolved } = useMutation(
    (answer: string) => updateQuizIsSolved({ quizId, answer }),
    {
      mutationKey: ["quizIsSolved", quizId],
      onSuccess: () => {
        queryClient.invalidateQueries(["quizDetail", quizId]);
      },
      onError: (err) => {},
    }
  );

  const { mutate: mutateQuizGrade } = useMutation(
    (score: number) => updateQuizScore({ quizId, score }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quizDetail", quizId]);
      },
      onError: (err) => {},
    }
  );
  const { data: challengeDetail, error: challengeError } =
    useChallengeDetailQuery({ challengeId });

  if (challengeError || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }

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
  return (
    <div className="absolute top-0 w-full h-screen pt-20 sm:h-full sm:mt-16 sm:pt-2">
      <div className="flex justify-between items-center w-1/2 py-5 px-20 sm:w-full sm:px-10">
        <div className="flex gap-5 items-center text-gray-700 text-sm">
          <h2 className="font-semibold text-2xl">{quizDetail?.quizTitle}</h2>
          <span>작성자: {quizDetail?.writerName}</span>
        </div>
        {quizDetail && <QuizRate quizDetail={quizDetail} />}
      </div>
      <div className="grid grid-cols-2 gap-10 px-20 h-[79%] sm:flex sm:flex-col sm:h-fit sm:px-10 sm:pb-20">
        <div className="h-full pr-10 pb-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 sm:pr-0">
          <div className="flex flex-col gap-10">
            <p className="flex flex-col gap-5 justify-between p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
              {quizDetail && contentsFormat(quizDetail?.quizContent)}
              {quizDetail?.quizFiles.map((quizFile) => (
                <img key={quizFile.id} src={quizFile.qfPath} width={500} />
              ))}
            </p>

            {quizDetail?.solveAnswer && (
              <div className="flex flex-col gap-3">
                <h2 className="text-xl">내 정답</h2>
                <div className="p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                  {quizDetail?.solveAnswer &&
                    contentsFormat(quizDetail?.solveAnswer)}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-full pr-10 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 sm:pr-0 sm:pb-10">
          <div className="flex flex-col gap-5">
            {!quizDetail?.solveAnswer && (
              <form
                onSubmit={handleSolveSubmit(onSolveValid)}
                className="flex flex-col gap-8 pb-10 items-end"
              >
                <div className="flex flex-col w-full gap-2">
                  <label className="text-xl">
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
            )}
            <div className="flex justify-between">
              <h2 className="text-xl">정답</h2>
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
                  {quizDetail?.quizAnswer &&
                    contentsFormat(quizDetail?.quizAnswer)}
                </p>
                <div className="flex flex-col items-end gap-5">
                  <div className="w-full flex flex-col gap-3">
                    <h2 className="text-xl">해설</h2>
                    <div className="p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                      {quizDetail?.quizExplanation &&
                        contentsFormat(quizDetail?.quizExplanation)}
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-3 items-end mb-10">
                    <h2 className="w-full text-xl">
                      {!quizDetail?.solveScore ? "채점하기" : "채점 결과"}
                    </h2>
                    <>
                      {quizDetail?.solveScore ? (
                        <div className="w-full p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                          {quizDetail.solveScore} 점
                        </div>
                      ) : (
                        <>
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
                        </>
                      )}
                    </>
                  </div>
                </div>
              </>
            )}
            <CommentContainer />
          </div>
        </div>
      </div>
      {quizzes && (
        <QuizDetailNav
          challengeId={challengeId}
          quizId={quizId}
          quizzes={quizzes}
        />
      )}
    </div>
  );
}

export default QuizDetailPage;
