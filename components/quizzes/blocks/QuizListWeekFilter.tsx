import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useCurrentWeekQuery } from "../../../api/challenges/hooks";
import { weekSelectState } from "../stores/weekFilter";
interface Props {
  challengeId: string;
}
function WeekFilter({ challengeId }: Props) {
  const [selected, setSelected] = useRecoilState<boolean[]>(weekSelectState);

  const { data: currentWeek } = useCurrentWeekQuery({ challengeId });

  useEffect(() => {
    getAllWeek();
  }, [currentWeek]);

  // 열람 가능한 모든 주차를 가져오는 함수
  const getAllWeek = () => {
    if (currentWeek) {
      const allWeek = Array(currentWeek).fill(true);
      setSelected(allWeek);
    }
  };

  const onWeekClick = (week: number) => {
    let newSelected = [...selected];

    newSelected[week] = !newSelected[week];

    setSelected(newSelected);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <span className="font-semibold">주차별 보기</span>
        <span
          onClick={getAllWeek}
          className="text-gray-700 underline cursor-pointer"
        >
          전체선택
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {selected.map((value, index) => (
          <>
            {value && (
              <div
                key={index}
                onClick={() => onWeekClick(index)}
                className="gap-2 cursor-pointer badge badge-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 cursor-pointer stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {index + 1}주차
              </div>
            )}
          </>
        ))}
        {selected.map((value, index) => (
          <>
            {!value && (
              <div
                key={index}
                onClick={() => onWeekClick(index)}
                className="badge badge-secondary cursor-pointer hover:bg-[#beaaff]"
              >
                {index + 1}주차
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default WeekFilter;
function value(value: any, arg1: (i: any) => any) {
  throw new Error("Function not implemented.");
}
