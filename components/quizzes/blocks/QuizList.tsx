import React from "react";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useQuizzesQuery } from "../../../api/quizzes/hooks";
import { useRecoilValue } from "recoil";
import { weekSelectState } from "../stores/weekFilter";
import { useRouter } from "next/router";

interface Props {
  challengeId: string;
  week?: string;
  page: "READABLE" | "MY" | "LIKED";
}

function QuizList({ challengeId, week, page }: Props) {
  const router = useRouter();
  const selected = useRecoilValue<boolean[]>(weekSelectState);

  const { data: quizzes } = useQuizzesQuery({
    challengeId,
    page,
    week,
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
        return `${LINK_HEAD}`;
    }
  };

  const onQuizClick = (quizId: number) => {
    router.push(getLinkByPage(quizId));
  };

  return (
    <div className="w-full overflow-x-scroll">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 sm:px-3">
              번호
            </th>
            <th scope="col" className="px-6 py-3 sm:px-3">
              제목
            </th>
            <th scope="col" className="px-6 py-3 sm:px-3">
              작성자
            </th>
            <th scope="col" className="px-6 py-3 sm:px-3">
              주차
            </th>
            <th scope="col" className="px-6 py-3 sm:px-3">
              좋아요
            </th>
            <th scope="col" className="px-6 py-3 sm:px-3">
              해결
            </th>
          </tr>
        </thead>
        <tbody>
          {quizzes
            ?.filter((value) => selected[value.quizWeek - 1])
            ?.map((quiz) => (
              <tr
                className="bg-white border-b cursor-pointer"
                key={quiz.quizId}
                onClick={() => onQuizClick(quiz.quizId)}
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 sm:px-3 whitespace-nowrap"
                >
                  {quiz.quizId}
                </td>
                <td className="px-6 py-4 sm:px-3 whitespace-nowrap">
                  {quiz.quizTitle}
                </td>
                <td className="px-6 py-4 sm:px-3 whitespace-nowrap">
                  {quiz.writerName}
                </td>
                <td className="px-6 py-4 sm:px-3 whitespace-nowrap">
                  {quiz.quizWeek}주
                </td>
                <td className="flex items-center justify-start px-6 py-4 sm:px-3 whitespace-nowrap">
                  <span className="flex items-center justify-center gap-1">
                    <Icon icon="icon-park-solid:good-two" />
                    <span className="">
                      {quiz.cntOfGood ? quiz.cntOfGood : 0}
                    </span>
                  </span>
                </td>
                {quiz.isSolved ? (
                  <td className="px-6 py-4 sm:px-3 whitespace-nowrap">
                    <Icon
                      icon="bi:patch-check-fill"
                      color="#5c3cde"
                      height={24}
                    />
                  </td>
                ) : (
                  <td className="px-6 py-4 sm:px-3 whitespace-nowrap"></td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuizList;
