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

  return (
    <div className="w-full sm:overflow-x-scroll">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="bg-gray-200">번호</th>
            <th className="bg-gray-200">제목</th>
            <th className="bg-gray-200">작성자</th>
            <th className="bg-gray-200">주차</th>
            <th className="bg-gray-200">해결</th>
          </tr>
        </thead>
        <tbody className="">
          {quizzes?.map((quiz) => (
            <Link
              href={`/challenges/${challengeId}/quizzes/${quiz.quizId}/?week=${
                router.asPath.split("?week=")[1]
              }`}
              key={quiz.quizId}
            >
              <tr className="cursor-pointer sm:text-sm">
                <td>{quiz.quizId}</td>
                <td>{quiz.quizTitle}</td>
                <td>{quiz.writerName}</td>
                <td>{quiz.quizWeek}</td>
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
