import Link from "next/link";
import React from "react";
import { useOpenWeeksQuery } from "../../api/challenges/hooks";
interface Props {
  challengeId: string;
}
function ChallengeMenu({ challengeId }: Props) {
  const { data: openWeeks } = useOpenWeeksQuery({ challengeId });
  return (
    <div className="col-start-1 col-span-2 m-10 border-r-[1px] sm:w-5/6 sm:m-auto sm:border-none">
      <h3 className="py-3 text-sm font-semibold text-gray-500">문제</h3>
      <ul className="pr-5 menu bg-base-100">
        {openWeeks && (
          <li>
            <Link href={`/challenges/${challengeId}/quizzes`}>전체 문제</Link>
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
