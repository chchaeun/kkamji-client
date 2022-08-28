import Link from "next/link";
import React from "react";
import useCurrentWeekQuery from "../../hooks/current-week-query";
import { Challenge } from "../../types/Challenge";

interface Props {
  challenges: Challenge[];
}

function ChallengeList({ challenges }: Props) {
  const { data: currentWeek } = useCurrentWeekQuery();

  const getPercentage = (totalWeeks: number) => {
    if (!currentWeek) {
      return;
    }
    console.log(currentWeek.week, totalWeeks);
    return Math.floor((currentWeek?.week / totalWeeks) * 100);
  };

  return (
    <div className="grid grid-cols-3 gap-10 sm:flex sm:flex-col">
      {challenges?.map((challenge) => (
        <Link
          href={`/challenges/${challenge.challengeId}`}
          key={challenge.challengeId}
        >
          <div className="col-span-1 flex flex-col gap-3 transition ease-in-out hover:-translate-y-1 duration-300 cursor-pointer">
            <img
              src={challenge.imageUrl}
              className="w-96 h-52 object-cover rounded-2xl"
            />
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold">{challenge.title}</div>
                <div className="text-gray-700">
                  {challenge.professorName} 교수님
                </div>
              </div>
              <div className="text-sm text-gray-700">
                진행률 {getPercentage(challenge.totalWeeks)}%
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChallengeList;
