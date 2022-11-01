import { useRouter } from "next/router";
import React, { Suspense } from "react";
import ChallengeOverview from "../../../../components/challenges/ChallengeOverview";
import dynamic from "next/dynamic";
import QuizListSkeleton from "../../../../components/skeletons/QuizListSkeleton";
import DeferredComponent from "../../../../components/skeletons/DeferredComponent";
import HeadTitle from "../../../../components/common/HeadTitle";
import { useChallengeDetailQuery } from "../../../../api/challenges/hooks";
import QuizListPageTemplate from "../../../../components/quizzes";

function LikedQuizListPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const { data: challengeDetail, error } = useChallengeDetailQuery({
    challengeId,
  });

  if (error || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }

  return (
    <>
      <HeadTitle name="좋아요한 문제 : 깜지" />
      <QuizListPageTemplate challengeId={challengeId} page={"LIKED"} />
    </>
  );
}

export default LikedQuizListPage;
