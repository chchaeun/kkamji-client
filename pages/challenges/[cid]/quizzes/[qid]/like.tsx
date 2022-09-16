import { useRouter } from "next/router";
import React from "react";
import useChallengeDetailQuery from "../../../../../hooks/challenge-detail-query";
import QuizDetailTemplate from "../../../../../components/quiz-detail";
import useQuizzesQuery from "../../../../../hooks/quizzes-query";

function LikedQuizDetailPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);

  const { data: likedQuizzes } = useQuizzesQuery({
    challengeId,
    filter: "LIKED",
  });

  const { data: challengeDetail, error: challengeError } =
    useChallengeDetailQuery({ challengeId });

  if (challengeError || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }

  return <>{likedQuizzes && <QuizDetailTemplate quizzes={likedQuizzes} />}</>;
}

export default LikedQuizDetailPage;
