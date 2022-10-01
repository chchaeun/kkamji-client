import { useRouter } from "next/router";
import React, { Suspense } from "react";
import ChallengeOverview from "../../../../components/challenges/ChallengeOverview";
import WeekFilter from "../../../../components/quizzes/blocks/QuizListWeekFilter";
import useChallengeDetailQuery from "../../../../hooks/challenge-detail-query";
import dynamic from "next/dynamic";
import QuizListSkeleton from "../../../../components/skeletons/QuizListSkeleton";
import DeferredComponent from "../../../../components/skeletons/DeferredSkeleton";
const QuizList = dynamic(
  () => import("../../../../components/quizzes/blocks/QuizList"),
  {
    suspense: true,
    ssr: false,
  }
);
function QuizListPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const week = String(router.query.week);

  const { data: challengeDetail, error } = useChallengeDetailQuery({
    challengeId,
  });

  if (error || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }

  return (
    <div className="flex flex-col m-auto gap-10  py-[80px] px-[200px] sm:py-[88px] sm:px-[12px]">
      {challengeId && (
        <>
          <ChallengeOverview challengeId={challengeId} />
          <div className="flex flex-col gap-3 py-5 px-10 bg-white rounded-lg shadow-sm border-[1px] border-gray-300 sm:px-5">
            <WeekFilter />
          </div>
          <div className="flex flex-col gap-6 py-5 px-10 w-full bg-white rounded-lg shadow-sm border-[1px] border-gray-300 sm:px-5">
            <div className="font-semibold">열람 가능한 문제</div>
            <Suspense
              fallback={
                <DeferredComponent>
                  <QuizListSkeleton />
                </DeferredComponent>
              }
            >
              <QuizList
                challengeId={challengeId}
                week={week}
                page={"READABLE"}
              />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}

export default QuizListPage;
