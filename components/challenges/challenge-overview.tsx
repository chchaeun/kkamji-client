import React from "react";
import useChallengeDetailQuery from "../../hooks/challenge-detail-query";
interface Props {
  challengeId: string;
}
function ChallengeOverview({ challengeId }: Props) {
  const { data: challengeDetail } = useChallengeDetailQuery({ challengeId });

  return (
    <>
      {challengeDetail && (
        <div className="flex gap-5">
          <img
            src={challengeDetail.imageUrl}
            width={200}
            className="rounded-xl sm:w-1/3"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">{challengeDetail.title}</h1>
            <div className="flex flex-col">
              <span className="text-gray-700">
                {challengeDetail.university} {challengeDetail.department}
              </span>
              <span className="text-gray-700">
                {challengeDetail.professorName} 교수님
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChallengeOverview;
