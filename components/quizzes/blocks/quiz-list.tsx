import React from "react";

import { Icon } from "@iconify/react";
import Link from "next/link";
import useQuizzesQuery from "../../../hooks/quizzes-query";

interface Props {
  challengeId: string;
  week?: string;
  page: "READABLE" | "MY" | "LIKED";
}

function QuizList({ challengeId, week, page }: Props) {
  const { data: quizzes } = useQuizzesQuery({
    challengeId,
    week,
    page,
    suspense: true,
  });

  // page에 따라 퀴즈 상세페이지로 이동하는 href를 설정해주는 함수이다.
  const getLinkByPage = (quizId: number) => {
    const LINK_HEAD = `/challenges/${challengeId}/quizzes/${quizId}`;
    switch (page) {
      case "MY":
        return `${LINK_HEAD}/my`;
      case "LIKED":
        return `${LINK_HEAD}/like`;
      case "READABLE":
        return `${LINK_HEAD}?week=${week}`;
    }
  };
  return (
    <div className="w-full sm:overflow-x-scroll">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="bg-gray-200">번호</th>
            <th className="bg-gray-200">제목</th>
            <th className="bg-gray-200">작성자</th>
            <th className="bg-gray-200">주차</th>
            <th className="bg-gray-200">좋아요</th>
            <th className="bg-gray-200">해결</th>
          </tr>
        </thead>
        <tbody>
          {quizzes?.map((quiz) => (
            <Link href={getLinkByPage(quiz.quizId)} key={quiz.quizId}>
              <tr className="cursor-pointer sm:text-sm">
                <td>{quiz.quizId}</td>
                <td>{quiz.quizTitle}</td>
                <td>{quiz.writerName}</td>
                <td>{quiz.quizWeek}주</td>
                <td className="flex items-center justify-start">
                  <span className="flex items-center justify-center gap-1">
                    <Icon icon="icon-park-solid:good-two" />
                    <span className="">
                      {quiz.cntOfGood ? quiz.cntOfGood : 0}
                    </span>
                  </span>
                </td>
                {quiz.solveAnswer ? (
                  <td>
                    <Icon
                      icon="bi:patch-check-fill"
                      color="#5c3cde"
                      height={24}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuizList;
