import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import api from "../../../../api/my-api";
import { fetchQuizzes } from "../../../../api/quizzes/quizzes";
import QuizList from "../../../../components/quiz/quiz/quiz-list";

function QuizListPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const { data: quizzes } = useQuery(
    ["quizzes"],
    () => fetchQuizzes({ challengeId, week: 0 }),
    {
      enabled: !!challengeId,
    }
  );
  return (
    <div>
      <QuizList quizzes={quizzes} />
    </div>
  );
}

export default QuizListPage;
