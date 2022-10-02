import Link from "next/link";
import React from "react";
import { Challenge } from "../../../types/Challenge";

interface Props {
  challenges: Challenge[];
}

function ChallengeList({ challenges }: Props) {
  return (
    <div className="grid grid-cols-3 gap-10 sm:flex sm:flex-col">
      {challenges?.map((challenge) => (
        <>
          {challenge.applicationStatus === "ACCEPTED" && (
            <Link
              href={`/challenges/${challenge.challengeId}`}
              key={challenge.challengeId}
            >
              <div className="flex flex-col col-span-1 gap-3 transition duration-300 ease-in-out cursor-pointer hover:-translate-y-1">
                <img
                  src={challenge.imageUrl}
                  className="object-cover w-96 h-52 rounded-2xl"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">
                      {challenge.title} {challenge.chapter}기
                    </div>
                    <div className="text-gray-700">
                      {challenge.professorName} 교수님
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </>
      ))}
    </div>
  );
}

export default ChallengeList;
