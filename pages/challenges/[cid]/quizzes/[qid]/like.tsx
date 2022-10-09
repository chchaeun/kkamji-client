import { useRouter } from "next/router";
import React from "react";
import { useChallengeDetailQuery } from "../../../../../api/challenges/hooks";
import { useQuizzesQuery } from "../../../../../api/quizzes/hooks";
import QuizDetailTemplate from "../../../../../components/quiz-detail";

function LikedQuizDetailPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);

  const { data: likedQuizzes } = useQuizzesQuery({
    challengeId,
    page: "LIKED",
  });

  const { data: challengeDetail, error: challengeError } =
    useChallengeDetailQuery({ challengeId });

  if (challengeError || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }

  return (
    <>
      {likedQuizzes && (
        <QuizDetailTemplate page={"LIKED"} quizzes={likedQuizzes} />
      )}
    </>
  );
}

export default LikedQuizDetailPage;
