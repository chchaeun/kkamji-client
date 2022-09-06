import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { QuizSummary } from "../../../types/Quiz";
interface Props {
  quizzes: QuizSummary[];
}
function QuizList({ quizzes }: Props) {
  const router = useRouter();
  const challengeId = String(router.query.cid);

  const isMyQuizPage = router.asPath
    .split("/")
    .find((element) => element === "my")
    ? true
    : false;
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
        <tbody className="">
          {quizzes?.map((quiz) => (
            <Link
              href={
                isMyQuizPage
                  ? `/challenges/${challengeId}/quizzes/${quiz.quizId}/my`
                  : `/challenges/${challengeId}/quizzes/${quiz.quizId}?week=${
                      router.asPath.split("?week=")[1]
                    }`
              }
              key={quiz.quizId}
            >
              <tr className="cursor-pointer sm:text-sm">
                <td>{quiz.quizId}</td>
                <td>{quiz.quizTitle}</td>
                <td>{quiz.writerName}</td>
                <td>{quiz.quizWeek}주</td>
                <td className="flex items-center justify-start">
                  <span className="flex items-center justify-center gap-1">
                    <Icon icon="icon-park-solid:good-two" />
                    <span className="">
                      {quiz.countOfGood ? quiz.countOfGood : 0}
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
