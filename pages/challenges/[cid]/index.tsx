import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import useCurrentWeekQuery from "../../../hooks/current-week-query";
import { Icon } from "@iconify/react";
import useSubmitCountQuery from "../../../hooks/submit-count-query";
import useChallengeDetailQuery from "../../../hooks/challenge-detail-query";
import ChallengeOverview from "../../../components/challenges/challenge-overview";
import useOpenWeeksQuery from "../../../hooks/open-weeks";
import OpenWeekList from "../../../components/quizzes/week/open-weeks-list";
import ChallengeMenu from "../../../components/challenges/challenge-menu";

function ChallengePage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);

  const { data: currentWeek } = useCurrentWeekQuery();
  const { data: openWeeks } = useOpenWeeksQuery();

  const {
    data: challengeDetail,
    isLoading,
    error,
  } = useChallengeDetailQuery({
    challengeId,
  });

  const { data: submitCount } = useSubmitCountQuery();

  // 챌린지 미션 성공 또는 실패 횟수를 반환하는 함수이다.
  const missionCount = (successOrFail: string) => {
    if (!openWeeks && !challengeDetail) {
      return 0;
    }
    const successCount = openWeeks!.weeks.filter(
      (week) => week.status === "READABLE" || week.status === "READABLE_CLOSED"
    ).length;

    const failCount = openWeeks!.weeks.filter(
      (week) => week.status === "UNREADABLE"
    ).length;

    if (successOrFail === "success") {
      return successCount;
    } else if (successOrFail === "fail") {
      return failCount;
    } else {
      return challengeDetail!.totalWeeks - successCount - failCount;
    }
  };

  if (error) {
    return <div>없는 페이지입니다.</div>;
  }

  return (
    <div className="grid grid-cols-10 sm:flex sm:flex-col-reverse sm:py-10">
      <ChallengeMenu challengeId={challengeId} />
      <div className="col-start-3 col-span-6 flex flex-col gap-10 py-10 sm:m-auto sm:w-5/6 sm:pb-10">
        {challengeDetail?.applicationStatus === "ACCEPTED" ? (
          <>
            <div className="flex justify-between sm:flex-col sm:gap-5">
              {challengeDetail && (
                <ChallengeOverview challengeId={challengeId} />
              )}
              <div className="flex flex-col gap-2 items-center">
                <Link href={`/challenges/${challengeId}/write`}>
                  <button className="w-fit h-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer sm:w-full">
                    문제 작성
                  </button>
                </Link>
                <div className="flex items-center">
                  이번주{" "}
                  <Icon
                    icon={`carbon:number-${submitCount}`}
                    className="text-3xl"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <span className="flex items-center gap-2 text-lg">
                현재 {currentWeek} 주차 <Icon icon="mdi:run-fast" />
              </span>
              {currentWeek && (
                <ProgressBar
                  completed={currentWeek}
                  maxCompleted={challengeDetail?.totalWeeks}
                  bgColor={"#5c3cde"}
                  baseBgColor={"#f7f6fc"}
                  animateOnRender={true}
                  labelAlignment={"outside"}
                  customLabel={`${challengeDetail?.totalWeeks}주`}
                  labelColor={"#000000"}
                  labelClassName={"w-1/12 text-sm px-3 sm:w-1/5"}
                />
              )}
            </div>
            {openWeeks && currentWeek && (
              <div className="flex flex-col gap-5">
                <span className="flex items-center gap-2 text-lg">
                  미션 달성률 <Icon icon="icon-park-solid:success" />
                </span>
                <div className="flex flex-col gap-3">
                  <p className="text-gray-700">
                    지금부터 매주 미션을 성공하면 최대{" "}
                    {Math.floor(
                      ((missionCount("success") + missionCount("remain")) /
                        openWeeks.totalWeeks) *
                        100
                    )}
                    %까지 달성 가능합니다!
                  </p>
                  <ProgressBar
                    completed={missionCount("success")}
                    maxCompleted={challengeDetail?.totalWeeks}
                    bgColor={"#5c3cde"}
                    baseBgColor={"#f7f6fc"}
                    animateOnRender={true}
                    labelAlignment={"outside"}
                    customLabel={`${Math.floor(
                      (missionCount("success") / openWeeks?.totalWeeks) * 100
                    )}%`}
                    labelColor={"#000000"}
                    labelClassName={"w-1/12 text-sm px-3 sm:w-1/5"}
                  />
                </div>

                <div className="flex flex-col gap-5 py-5 px-10 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                  <div className="flex gap-10 w-1/3 text-gray-700 text-sm sm:w-full sm:gap-5">
                    <div className="flex flex-col">
                      <span>미션 성공</span>
                      <span className="text-lg font-semibold">
                        {missionCount("success")}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span>미션 실패</span>
                      <span className="text-lg font-semibold">
                        {missionCount("fail")}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span>남은 미션</span>
                      <span className="text-lg font-semibold">
                        {missionCount("remain")}
                      </span>
                    </div>
                  </div>
                  <OpenWeekList openWeeks={openWeeks} />
                </div>
              </div>
            )}
          </>
        ) : (
          <>{isLoading ? <div></div> : <div>없는 페이지입니다.</div>}</>
        )}
      </div>
    </div>
  );
}

export default ChallengePage;
