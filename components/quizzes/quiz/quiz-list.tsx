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
    <div className="cursor-pointer">
      <div className="grid grid-cols-7 border-b-[1px] pb-2 mb-3 sm:grid-cols-4">
        <span className="flex flex-col items-center">번호</span>
        <span className="col-span-4 flex flex-col items-center sm:col-span-2">
          제목
        </span>
        <span className="flex flex-col items-center sm:hidden">작성자</span>
        <span className="flex flex-col items-center">해결</span>
      </div>
      <div className="flex flex-col gap-3">
        {quizzes?.map((quiz) => (
          <Link
            href={`${router.asPath.split("?week=")[0]}/${quiz.quizId}/?week=${
              router.asPath.split("?week=")[1]
            }`}
            key={quiz.quizId}
          >
            <div className="grid grid-cols-7 sm:grid-cols-4">
              <span className="flex flex-col items-center">{quiz.quizId}</span>
              <span className="col-span-4 sm:col-span-2">{quiz.quizTitle}</span>
              <span className="flex flex-col items-center sm:hidden">
                {quiz.writerName}
              </span>
              {quiz.isSolved && (
                <span className="flex flex-col items-center">
                  <Icon
                    icon="bi:patch-check-fill"
                    color="#5c3cde"
                    height={24}
                  />
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
