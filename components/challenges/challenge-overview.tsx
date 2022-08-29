import React from "react";
import { Challenge } from "../../types/Challenge";
interface Props {
  challengeDetail: Challenge;
}
function ChallengeOverview({ challengeDetail }: Props) {
  const { imageUrl, title, university, department, professorName } =
    challengeDetail;
  return (
    <div className="flex gap-5">
      <img src={imageUrl} width={200} className="rounded-xl sm:w-1/3" />
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl">{title}</h1>
        <div className="flex flex-col">
          <span className="text-gray-700">
            {university} {department}
          </span>
          <span className="text-gray-700">{professorName} 교수님</span>
        </div>
      </div>
    </div>
  );
}

export default ChallengeOverview;
