import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import { classNames } from "../../../styles/classname-maker";
import { OpenWeeks } from "../../../types/Challenge";
interface Props {
  openWeeks: OpenWeeks;
}
function OpenWeekList({ openWeeks }: Props) {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const onWeekClick = (week: number, index: number) => {
    if (
      router.pathname === "/challenges/[cid]/quizzes" &&
      openWeeks?.weeks.length > index &&
      openWeeks?.weeks[index]
    ) {
      router.push(`/challenges/${challengeId}/quizzes?week=${week}`);
    }
  };
  return (
    <div className="flex gap-2 text-sm sm:grid sm:grid-cols-5">
      {Array.from({ length: openWeeks?.totalWeeks }, (v, i) => i + 1).map(
        (week, index) => (
          <span
            key={index}
            onClick={() => onWeekClick(week, index)}
            className={classNames(
              router.query.week &&
                openWeeks?.weeks.length > index &&
                openWeeks?.weeks[index]
                ? "hover:bg-[#5c3cde]"
                : "",
              router.query.week && Number(router.query.week) === week
                ? "bg-[#5c3cde] text-white cursor-pointer"
                : openWeeks?.weeks.length > index && openWeeks?.weeks[index]
                ? "bg-[#b2a4e5] text-white cursor-pointer"
                : "bg-[#ebebeb] cursor-default",
              "flex justify-center items-center w-7 h-7 rounded font-semibold"
            )}
          >
            {openWeeks?.weeks.length <= index
              ? week
              : openWeeks?.weeks[index]
              ? week
              : "X"}
          </span>
        )
      )}
    </div>
  );
}

export default OpenWeekList;
