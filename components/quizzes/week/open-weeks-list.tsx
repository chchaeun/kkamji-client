import React from "react";
import { classNames } from "../../../styles/classname-maker";
import { OpenWeeksSelect } from "../../../types/Challenge";
interface Props {
  openWeeks: OpenWeeksSelect;
}
function OpenWeekList({ openWeeks }: Props) {
  return (
    <div className="flex gap-2 text-sm sm:grid sm:grid-cols-5">
      {openWeeks.weeks.map((week) => (
        <span
          key={week.week}
          className={classNames(
            week.status === "CLOSED" || week.status === "UNREADABLE"
              ? "bg-[#ebebeb] cursor-default"
              : "bg-[#b2a4e5] text-white cursor-pointer",
            "flex justify-center items-center w-7 h-7 rounded font-semibold"
          )}
        >
          {week.status === "UNREADABLE" ? "X" : week.week}
        </span>
      ))}
    </div>
  );
}

export default OpenWeekList;
