import { useRouter } from "next/router";
import React from "react";
import HeadTitle from "../../../../components/common/HeadTitle";
import { useChallengeDetailQuery } from "../../../../api/challenges/hooks";
import QuizListPageTemplate from "../../../../components/quizzes";

function QuizListPage() {
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
      <HeadTitle name="전체 문제 : 깜지" />
      <QuizListPageTemplate challengeId={challengeId} page={"READABLE"} />
    </>
  );
}

export default QuizListPage;
