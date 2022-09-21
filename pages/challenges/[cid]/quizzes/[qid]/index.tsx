import { useRouter } from "next/router";
import React from "react";
import useChallengeDetailQuery from "../../../../../hooks/challenge-detail-query";
import QuizDetailTemplate from "../../../../../components/quiz-detail";
import useQuizzesQuery from "../../../../../hooks/quizzes-query";

function QuizDetailPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const week = String(router.query.week);

  const { data: quizzes } = useQuizzesQuery({
    challengeId,
    week,
    page: "READABLE",
  });

  const { data: challengeDetail, error: challengeError } =
    useChallengeDetailQuery({ challengeId });

  if (challengeError || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }

  return (
    <>{quizzes && <QuizDetailTemplate page={"READABLE"} quizzes={quizzes} />}</>
  );
}

export default QuizDetailPage;
