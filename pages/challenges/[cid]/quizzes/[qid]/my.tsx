import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import api from "../../../../../api/my-api";
import CommentContainer from "../../../../../components/quizzes/comment/comment-container";
import useChallengeDetailQuery from "../../../../../hooks/challenge-detail-query";
import useMyQuizzesQuery from "../../../../../hooks/my-quizzes-query";
import { classNames } from "../../../../../styles/classname-maker";
import { MyQuizDetail, MyQuizDetailSelect } from "../../../../../types/Quiz";

function QuizDetailPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const quizId = String(router.query.qid);
  const week = String(router.query.week);
  const [showToc, setShowToc] = useState(false);

  const { data: quizDetail, error } = useQuery<
    MyQuizDetail,
    AxiosError,
    MyQuizDetailSelect
  >(
    ["myQuizDetail", quizId],
    async () => {
      const { data } = await api.get(`/my/quizzes/${quizId}`);
      return data;
    },
    {
      enabled: !!router.query.qid,
      onError: (err) => {},
      select: (data) => {
        return { ...data, quizRubric: JSON.parse(data.quizRubric) };
      },
    }
  );

  const { data: quizzes } = useMyQuizzesQuery({ challengeId });

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
            `/challenges/${challengeId}/quizzes/${quizzes[i - 1].quizId}/my`
          );
        } else if (move === "next" && i + 1 < quizzes.length) {
          router.push(
            `/challenges/${challengeId}/quizzes/${quizzes[i + 1].quizId}/my`
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

  const onTocClick = () => {
    setShowToc((prev) => !prev);
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
      <div className="flex gap-5 items-center py-5 px-20 text-gray-700 text-sm sm:px-10">
        <h2 className="font-semibold text-2xl">{quizDetail?.quizTitle}</h2>
        <span>작성자: {quizDetail?.writerName}</span>
      </div>
      <div className="grid grid-cols-2 gap-10 px-20 pb-20 h-[79%] sm:flex sm:flex-col sm:h-fit sm:px-10">
        <div className="h-full pr-10 pb-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 sm:pr-0">
          <div className="flex flex-col gap-10">
            <p className="flex flex-col gap-5 justify-between p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
              {quizDetail?.quizContent &&
                contentsFormat(quizDetail?.quizContent)}
              {quizDetail?.quizFiles.map((quizFile) => (
                <img key={quizFile.id} src={quizFile.qfPath} width={500} />
              ))}
            </p>
          </div>
        </div>
        <div className="h-full pr-10 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 sm:pr-0 sm:pb-10">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <h2 className="text-xl">정답</h2>
              <div className="flex gap-2">
                <button
                  onClick={onEditClick}
                  className="text-gray-700 underline"
                >
                  수정
                </button>
              </div>
            </div>
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
              </div>
              <div className="flex flex-col items-end gap-5">
                <div className="w-full flex flex-col gap-3">
                  <h2 className="text-xl">채점 기준</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="bg-gray-200 w-2">점수</th>
                        <th className="bg-gray-200">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizDetail?.quizRubric.map((rubric, index) => (
                        <tr key={index}>
                          <td>{rubric.score}</td>
                          <td>{rubric.content}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
            <CommentContainer />
          </div>
        </div>
      </div>
      <div className="fixed flex items-center justify-between gap-3 w-full left-0 bottom-0 p-3 border-t-[1px] bg-white z-10">
        <button
          type="button"
          onClick={onTocClick}
          className="py-2 px-4 rounded bg-gray-100 text-gray-700 cursor-pointer"
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
        <div className="fixed left-0 top-0 flex flex-col gap-5 w-1/4 h-full py-32 px-10 bg-white shadow-sm border-[1px] border-gray-300 sm:w-[80%] sm:py-20 animate-in slide-in-from-left-10 duration-200">
          <h2 className="font-semibold text-xl cursor-pointer">문제 목록</h2>

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
                <Link
                  href={`/challenges/${challengeId}/quizzes/${quiz.quizId}/my`}
                >
                  {quiz.quizTitle}
                </Link>
                <span className="badge badge-secondary font-normal">
                  {quiz.quizWeek}주차
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuizDetailPage;
