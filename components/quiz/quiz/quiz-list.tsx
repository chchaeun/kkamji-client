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
    <div>
      <div className="grid grid-cols-6">
        <span className="">번호</span>
        <span className="col-span-3">제목</span>
        <span>작성자</span>
        <span>해결</span>
      </div>
      {quizzes?.map((quiz) => (
        <Link
          href={`/challenges/${challengeId}/quizzes/${quiz.quizId}`}
          key={quiz.quizId}
        >
          <div className="grid grid-cols-6">
            <span>{quiz.quizId}</span>
            <span className="col-span-3">{quiz.quizTitle}</span>
            <span>{quiz.writerName}</span>
            {quiz.isSolved && (
              <Icon icon="bi:patch-check-fill" color="#5c3cde" height={24} />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default QuizList;
