import { useRouter } from "next/router";
import React from "react";
import { classNames } from "../../../styles/classname-maker";
import { OpenWeeks } from "../../../types/Challenge";
interface Props {
  openWeeks: OpenWeeks;
}
function OpenWeekList({ openWeeks }: Props) {
  return (
    <div className="flex gap-2 text-sm sm:grid sm:grid-cols-5">
      {openWeeks?.weeks.map((week) => (
        <span
          key={week.week}
          className={classNames(
            week.status === "close" || week.status === "fail"
              ? "bg-[#ebebeb] cursor-default"
              : "bg-[#b2a4e5] text-white cursor-pointer",
            "flex justify-center items-center w-7 h-7 rounded font-semibold"
          )}
        >
          {week.status === "fail" ? "X" : week.week}
        </span>
      ))}
    </div>
  );
}

export default OpenWeekList;
