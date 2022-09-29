import Link from "next/link";
import React from "react";
import useOpenWeeksQuery from "../../hooks/open-weeks";
interface Props {
  challengeId: string;
}
function ChallengeMenu({ challengeId }: Props) {
  const { data: openWeeks } = useOpenWeeksQuery();
  return (
    <div className="col-start-1 col-span-2 m-10 border-r-[1px] sm:w-5/6 sm:m-auto sm:border-none">
      <h3 className="py-3 text-sm font-semibold text-gray-500">문제</h3>
      <ul className="menu bg-base-100 pr-5">
        {openWeeks && (
          <li>
            <Link
              href={`/challenges/${challengeId}/quizzes?week=${openWeeks?.weeks
                .filter((week) => week.status === "READABLE")
                .map((week) => week.week)
                .join(",")}`}
            >
              열람 가능한 문제
            </Link>
          </li>
        )}
        <li>
          <Link href={`/challenges/${challengeId}/quizzes/my`} className="">
            내가 낸 문제
          </Link>
        </li>
        <li>
          <Link href={`/challenges/${challengeId}/quizzes/like`}>
            좋아요한 문제
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ChallengeMenu;