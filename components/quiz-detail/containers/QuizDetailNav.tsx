import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useChallengeDetailQuery } from "../../../api/challenges/hooks";
import { classNames } from "../../../styles/ClassNames";
import { QuizSummary } from "../../../types/Quiz";
interface Props {
  challengeId: string;
  quizId: string;
  quizzes: QuizSummary[];
  page: "READABLE" | "MY" | "LIKED";
}
function QuizDetailNav({ challengeId, quizId, quizzes, page }: Props) {
  const { data: challengeDetail } = useChallengeDetailQuery({ challengeId });
  const router = useRouter();

  const [showToc, setShowToc] = useState(false);

  const onTocClick = () => {
    setShowToc((prev) => !prev);
  };

  const onMoveQuizClick = (move: string) => {
    if (!quizzes) {
      return;
    }
    for (let i = 0; i < quizzes.length; i++) {
      if (String(quizzes[i].quizId) === quizId) {
        if (move === "prev" && i - 1 >= 0) {
          document.location.replace(
            `/challenges/${challengeId}/quizzes/${quizzes[i - 1].quizId}${
              page === "MY" ? "/my" : page === "LIKED" ? "/like" : ""
            }${
              page === "READABLE"
                ? `?week=${router.asPath.split("?week=")[1]}`
                : ""
            }`
          );
        } else if (move === "next" && i + 1 < quizzes.length) {
          document.location.replace(
            `/challenges/${challengeId}/quizzes/${quizzes[i + 1].quizId}${
              page === "MY" ? "/my" : page === "LIKED" ? "/like" : ""
            }${
              page === "READABLE"
                ? `?week=${router.asPath.split("?week=")[1]}`
                : ""
            }`
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
    <>
      <div className="fixed flex items-center justify-between gap-3 w-full left-0 bottom-0 p-3 border-t-[1px] bg-white z-30">
        <button
          type="button"
          onClick={onTocClick}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded cursor-pointer"
        >
          문제 목록
        </button>
        <Link href={`/challenges/${challengeId}`}>
          <button
            type="button"
            className="text-gray-700 cursor-pointer hover:drop-shadow"
          >
            {challengeDetail?.title} 챌린지
          </button>
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => onMoveQuizClick("prev")}
            className={classNames(
              isDisabled("prev")
                ? "bg-gray-100 text-gray-700 cursor-default"
                : "bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold focus:outline-none focus:shadow-outline cursor-pointer",
              "py-2 px-4 rounded"
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
              "py-2 px-4 rounded"
            )}
          >
            다음
          </button>
        </div>
      </div>
      {showToc && (
        <div className="fixed left-0 top-0 flex flex-col gap-5 w-1/4 h-full py-32 px-10 bg-white shadow-sm border-[1px] border-gray-300 sm:w-[80%] sm:py-20 animate-in slide-in-from-left-10 duration-200 z-20">
          <h2 className="text-xl font-semibold cursor-pointer">문제 목록</h2>

          <ul className="flex flex-col gap-1 overflow-y-scroll scrollbar-thin">
            {quizzes?.map((quiz) => (
              <li
                key={quiz.quizId}
                className={classNames(
                  String(quiz.quizId) === quizId
                    ? "text-lg font-semibold text-[#5c3cde]"
                    : "",
                  "flex items-center gap-2"
                )}
                onClick={() => setShowToc(false)}
              >
                <button
                  onClick={() => {
                    document.location.replace(
                      `/challenges/${challengeId}/quizzes/${quiz.quizId}${
                        page === "MY" ? "/my" : page === "LIKED" ? "/like" : ""
                      }${
                        page === "READABLE"
                          ? `?week=${router.asPath.split("?week=")[1]}`
                          : ""
                      }`
                    );
                  }}
                >
                  {quiz.quizTitle}
                </button>
                <span className="font-normal badge badge-secondary">
                  {quiz.quizWeek}주차
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default QuizDetailNav;
