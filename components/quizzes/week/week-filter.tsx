import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useOpenWeeksQuery from "../../../hooks/open-weeks";

function WeekFilter() {
  const router = useRouter();

  const { data: openWeeks } = useOpenWeeksQuery();

  const [selected, setSelected] = useState<number[]>([]);
  const [unselected, setUnselected] = useState<number[]>([]);

  useEffect(() => {
    getAllSuccessWeek();
  }, [openWeeks]);

  // 열람 가능한 모든 주차를 가져오는 함수
  const getAllSuccessWeek = () => {
    if (openWeeks?.weeks) {
      let allSuccessWeek = Array<number>();
      openWeeks.weeks.forEach((week) => {
        if (week.status === "READABLE") {
          allSuccessWeek.push(week.week);
        }
      });

      setSelected(allSuccessWeek);
      setUnselected([]);

      // 쿼리 스트링으로 열람 가능한 모든 주차를 넣어준다.
      router.push(
        `${router.asPath.split("?week=")[0]}?week=${allSuccessWeek.join(",")}`
      );
    }
  };

  // 선택된 주차인지 반환하는 함수
  const isSelected = (week: number) => {
    for (let i = 0; i < selected.length; i++) {
      if (selected[i] === week) {
        return true;
      }
    }
    return false;
  };

  const onWeekClick = (week: number) => {
    let newSelected = Array<number>();
    let newUnselected = Array<number>();

    // 주차가 이미 선택 되었으면 selected에서 unselected로 넘긴다.
    if (isSelected(week)) {
      if (selected.length === 1) {
        alert("최소 한 개 이상의 주차를 선택해야 합니다.");
        return;
      }
      newSelected = selected.filter((selectedWeek) => selectedWeek !== week);
      newUnselected = [...unselected, week];
      newUnselected.sort((a, b) => {
        return a - b;
      });
    } else {
      // 주차가 선택되지 않았으면 unselected에서 selected로 넘긴다.
      newUnselected = unselected.filter(
        (selectedWeek) => selectedWeek !== week
      );
      newSelected = [...selected, week];
      newSelected.sort((a, b) => {
        return a - b;
      });
    }

    // 새롭게 선택된 주차들을 쿼리 스트링에 넣어준다.
    router.push(
      `${router.asPath.split("?week=")[0]}?week=${newSelected.join(",")}`
    );
    setSelected(newSelected);
    setUnselected(newUnselected);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <span className="font-semibold">주차별 보기</span>
        <span
          onClick={getAllSuccessWeek}
          className="text-gray-700 underline cursor-pointer"
        >
          전체선택
        </span>
      </div>
      <div className="flex gap-2">
        {selected.map((week) => (
          <div key={week} className="badge badge-primary gap-2">
            <svg
              onClick={() => onWeekClick(week)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4 stroke-current cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            {week}주차
          </div>
        ))}
        {unselected.map((week) => (
          <div
            key={week}
            onClick={() => onWeekClick(week)}
            className="badge badge-secondary cursor-pointer hover:bg-[#beaaff]"
          >
            {week}주차
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekFilter;
