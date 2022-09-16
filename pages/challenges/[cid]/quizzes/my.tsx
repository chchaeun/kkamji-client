import { useRouter } from "next/router";
import React, { Suspense } from "react";
import ChallengeOverview from "../../../../components/challenges/challenge-overview";
import QuizListSkeleton from "../../../../components/skeletons/quiz-list-skeleton";
import useChallengeDetailQuery from "../../../../hooks/challenge-detail-query";
import dynamic from "next/dynamic";
const QuizList = dynamic(
  () => import("../../../../components/quizzes/blocks/quiz-list")
);
function MyQuizListPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid) || "";
  const { data: challengeDetail, error } = useChallengeDetailQuery({
    challengeId,
  });

  if (error || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }

  return (
    <div className="flex flex-col w-5/6 m-auto py-10 gap-10">
      {challengeId && <ChallengeOverview challengeId={challengeId} />}
      <div className="flex flex-col gap-6 py-5 px-10 bg-white rounded-lg shadow-sm border-[1px] border-gray-300 sm:px-5">
        <div className="font-semibold">내가 낸 문제</div>
        <Suspense fallback={<QuizListSkeleton />}>
          <QuizList challengeId={challengeId} filter={"MY"} />
        </Suspense>
      </div>
    </div>
  );
}

export default MyQuizListPage;
