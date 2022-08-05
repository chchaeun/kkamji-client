import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { fetchQuizAnswer, IQuizAnswer } from "../../api/quiz/quiz-answer";
import { fetchQuizDetail, IQuizDetail } from "../../api/quiz/quiz-detail";
import {
  fetchQuizIsSolved,
  IQuizIsSolved,
  updateQuizIsSolved,
} from "../../api/quiz/quiz-is-solved";
import SideNav from "../../components/layout/side-nav";
import { classNames } from "../../styles/classname-maker";
const navTitle = "문제집 이름";
const navElements = [
  {
    name: "문제1 제목",
    link: "/quizzes/1",
  },
  {
    name: "문제2 제목",
    link: "/quizzes/2",
  },
  {
    name: "문제3 제목",
    link: "/quizzes/3",
  },
];

// export async function getStaticPaths(){

// }
// export async function getStaticProps(){

// }

function QuizDetail() {
  const [showAnswer, setShowAnswer] = useState(false);

  const queryClient = useQueryClient();

  const router = useRouter();

  const quizId = String(router.query.qid);

  const { data: quizDetail, error } = useQuery<IQuizDetail, AxiosError>(
    ["quizDetail", quizId],
    () => fetchQuizDetail(quizId),
    { enabled: !!router.query.qid }
  );

  const { data: quizIsSolved } = useQuery<IQuizIsSolved>(
    ["quizIsSolved", quizId],
    () => fetchQuizIsSolved(quizId),
    {
      enabled: !!router.query.qid,
    }
  );

  const { data: quizAnswer } = useQuery<IQuizAnswer>(
    ["quizAnswer", quizId],
    () => fetchQuizAnswer(quizId),
    {
      enabled: !!router.query.qid,
    }
  );

  const { mutate: mutateQuizIsSolved } = useMutation(
    (props: { quizId: string; isCorrect: boolean }) =>
      updateQuizIsSolved(props),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quizIsSolved", quizId]);
      },
    }
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

  const onAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const onSolvedClick = (isCorrect: boolean) => {
    const props = {
      quizId,
      isCorrect,
    };
    mutateQuizIsSolved(props);
  };

  const onMoveQuizClick = (move: string) => {
    for (let i = 0; i < navElements.length; i++) {
      if (navElements[i].link === router.asPath) {
        if (move === "prev" && i - 1 >= 0) {
          setShowAnswer(false);

          router.push(navElements[i - 1].link);
        } else if (move === "next" && i + 1 < navElements.length) {
          setShowAnswer(false);

          router.push(navElements[i + 1].link);
        }
      }
    }
  };

  const isDisabled = (move: string) => {
    for (let i = 0; i < navElements.length; i++) {
      if (navElements[i].link === router.asPath) {
        if (move === "prev" && i - 1 < 0) {
          return false;
        } else if (move === "next" && i + 1 >= navElements.length) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className="grid grid-cols-5 gap-4 w-full lg:mt-20 m-auto sm:flex sm:flex-col sm:px-10">
      <div
        onClick={() => setShowAnswer(false)}
        className="col-start-1 flex justify-center mt-10 sm:mt-0"
      >
        <SideNav title={navTitle} elements={navElements} />
      </div>
      <div className="col-start-2 col-span-3 flex flex-col gap-8 py-10 sm:h-screen sm:justify-between sm:py-20">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl">{quizDetail?.quizTitle}</h2>
          <p className="flex items-center gap-5 justify-between bg-white p-5 drop-shadow-md">
            {quizDetail?.quizContent}
          </p>
          {!showAnswer && (
            <button
              onClick={onAnswerClick}
              className="m-auto bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              정답과 해설
            </button>
          )}
        </div>
        {showAnswer && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <h2 className="text-2xl">정답</h2>
                <button
                  onClick={onAnswerClick}
                  className="text-gray-700 underline"
                >
                  닫기
                </button>
              </div>
              <p className="flex items-center gap-5 justify-between bg-white p-5 drop-shadow-md">
                {quizAnswer?.quizAnswer}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl">해설</h2>
              <div className="flex flex-col gap-5 justify-between bg-white p-5 drop-shadow-md">
                {quizAnswer?.quizExplanation}
                {
                  <div className="px-3 bg-white border-l-4 border-indigo-400">
                    <h3 className="font-semibold">출처</h3>
                    <p>
                      {quizAnswer?.quizSource ? quizAnswer?.quizSource : "없음"}
                    </p>
                  </div>
                }
              </div>
            </div>
          </div>
        )}
        {showAnswer && !quizIsSolved?.quizIsSolved && (
          <div className="flex flex-col gap-2 items-center m-auto">
            <span className="flex gap-1">
              나는 이 문제를{" "}
              <button
                onClick={() => onSolvedClick(true)}
                className="py-1 px-3 rounded text-sm  bg-black text-white "
              >
                맞혔다
              </button>
              <button
                onClick={() => onSolvedClick(false)}
                className="py-1 px-3 rounded text-sm  bg-black text-white"
              >
                틀렸다
              </button>
            </span>
            <span className="text-sm text-gray-700 ">
              * 추후 오답노트 기능을 제공합니다
            </span>
          </div>
        )}
        <div className="flex justify-between sm:justify-end sm:gap-3">
          <button
            onClick={() => onMoveQuizClick("prev")}
            className={classNames(
              isDisabled("prev")
                ? "bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold focus:outline-none focus:shadow-outline cursor-pointer"
                : "bg-gray-200 text-gray-700 cursor-default",
              "py-2 px-4 mb-4 rounded"
            )}
          >
            이전
          </button>
          <button
            onClick={() => onMoveQuizClick("next")}
            className={classNames(
              isDisabled("next")
                ? "bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold focus:outline-none focus:shadow-outline cursor-pointer"
                : "bg-gray-200 text-gray-700 cursor-default",
              "py-2 px-4 mb-4 rounded"
            )}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizDetail;
