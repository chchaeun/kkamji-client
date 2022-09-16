import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { fetchQuizzes } from "../../../../../api/quizzes/quizzes";
import useChallengeDetailQuery from "../../../../../hooks/challenge-detail-query";
import { QuizSummary } from "../../../../../types/Quiz";
import QuizDetailTemplate from "../../../../../components/quiz-detail";

function LikedQuizDetailPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const week = String(router.query.week);

  const { data: likedQuizzes } = useQuery<QuizSummary[]>(
    ["likedQuizzes", challengeId],
    () => fetchQuizzes({ challengeId, week }),
    {
      enabled: !!router.query.cid,
    }
  );

  const { data: challengeDetail, error: challengeError } =
    useChallengeDetailQuery({ challengeId });

  if (challengeError || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }

  return <>{likedQuizzes && <QuizDetailTemplate quizzes={likedQuizzes} />}</>;
}

export default LikedQuizDetailPage;
