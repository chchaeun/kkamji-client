import React from "react";
import styled from "styled-components";
import { classNames } from "../../../styles/classname-maker";
import { media } from "../../../styles/media";
import { OpenWeeksSelect } from "../../../types/Challenge";
interface Props {
  openWeeks: OpenWeeksSelect;
}
function ChallengeOpenWeekList({ openWeeks }: Props) {
  return (
    <Block>
      {openWeeks.weeks.map((week) => (
        <WeekBox
          status={week.status}
          key={week.week}
          className={classNames(
            week.status === "CLOSED" || week.status === "UNREADABLE"
              ? "bg-[#ebebeb]"
              : "bg-[#b2a4e5] text-white",
            "flex justify-center items-center w-7 h-7 rounded font-semibold cursor-default"
          )}
        >
          {week.week}
        </WeekBox>
      ))}
    </Block>
  );
}

export default ChallengeOpenWeekList;

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  width: 100%;

  ${media.medium`
    display:grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 8px;
  `};
`;

const WeekBox = styled.span<{
  status: "READABLE" | "READABLE_CLOSED" | "CLOSED" | "UNREADABLE";
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 42px;
  height: 40px;

  background: ${(p) =>
    p.status === "CLOSED"
      ? "#F3F4F6"
      : p.status === "UNREADABLE"
      ? "#FEF2F2"
      : "#ecfdf5"};

  border-radius: 8px;

  font-size: 16px;
  color: ${(p) =>
    p.status === "CLOSED"
      ? "#374151"
      : p.status === "UNREADABLE"
      ? "#EF4444"
      : "#047857"};

  ${media.medium`
    width: 32px;
    height: 32px;
    
    border-radius: 6px;

    font-size: 14px;
  `}
`;
