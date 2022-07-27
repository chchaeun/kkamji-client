import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";
import {
  fetchSubmitPeriods,
  ISubmitPeriod,
} from "../../api/submit/submit-periods";
import { showRankingState } from "../../stores/header";
import { classNames } from "../../styles/classname-maker";

function SubmitPeriods() {
  const showRanking = useRecoilValue(showRankingState);

  const { data: submitPeriods } = useQuery<ISubmitPeriod[]>(
    ["submitPeriods"],
    fetchSubmitPeriods
  );

  return (
    <section
      className={classNames(
        showRanking
          ? "fixed visible w-screen h-screen p-10 bg-white bg-opacity-90"
          : "sm:hidden",
        "col-start-4 flex flex-col gap-2 items-center p-20"
      )}
    >
      <span className="font-semibold">오늘의 꾸준 챌린저 👑</span>
      <div className="flex flex-col">
        {submitPeriods?.map((submitPeriod, idx) => (
          <span key={idx}>
            {submitPeriod.userName} {submitPeriod.continuousSubmissionPeriod}일
            연속 제출
          </span>
        ))}
      </div>
      <a className="bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline cursor-pointer">
        문제 제출하기
      </a>
    </section>
  );
}

export default SubmitPeriods;
