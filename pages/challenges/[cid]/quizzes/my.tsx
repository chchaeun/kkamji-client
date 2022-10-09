import { useRouter } from "next/router";
import React, { Suspense } from "react";
import ChallengeOverview from "../../../../components/challenges/ChallengeOverview";
import QuizListSkeleton from "../../../../components/skeletons/QuizListSkeleton";
import dynamic from "next/dynamic";
import DeferredComponent from "../../../../components/skeletons/DeferredComponent";
import HeadTitle from "../../../../components/common/Title";
import { useChallengeDetailQuery } from "../../../../api/challenges/hooks";
const QuizList = dynamic(
  () => import("../../../../components/quizzes/blocks/QuizList"),
  {
    suspense: true,
    ssr: false,
  }
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
    <>
      <HeadTitle name="제출한 문제 : 깜지" />

      <div className="flex flex-col m-auto gap-10  py-[80px] px-[200px] sm:py-[88px] sm:px-[12px]">
        {challengeId && (
          <>
            <ChallengeOverview challengeId={challengeId} />
            <div className="flex flex-col gap-6 py-5 px-10 bg-white rounded-lg shadow-sm border-[1px] border-gray-300 sm:px-5">
              <div className="font-semibold">제출한 문제</div>
              <Suspense
                fallback={
                  <DeferredComponent>
                    <QuizListSkeleton />
                  </DeferredComponent>
                }
              >
                <QuizList challengeId={challengeId} page={"MY"} />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MyQuizListPage;
