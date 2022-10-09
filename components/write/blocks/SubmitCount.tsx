import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from "next/router";
import React from "react";
import { useSubmitCountQuery } from "../../../api/quizzes/hooks";
interface Props {
  currentWeek: number;
}
function SubmitCount({ currentWeek }: Props) {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const { data: submitCount } = useSubmitCountQuery({
    challengeId,
    week: currentWeek,
  });
  return (
    <div className="col-start-1 flex flex-col gap-5 h-fit mt-10 ml-10 py-5 px-8 bg-white rounded-lg shadow-sm border-[1px] border-gray-300 sm:mx-10 sm:my-0">
      <span className="">{currentWeek}주차 제출 현황</span>
      <ProgressBar
        completed={submitCount || 0}
        maxCompleted={2}
        bgColor={"#5c3cde"}
        baseBgColor={"#f7f6fc"}
        animateOnRender={true}
        labelAlignment={"outside"}
        customLabel={`${submitCount}/2`}
        labelColor={"#000000"}
        labelClassName={"w-1/12 text-sm px-3 sm:w-1/5"}
      />
    </div>
  );
}

export default SubmitCount;
