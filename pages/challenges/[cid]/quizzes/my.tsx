import { useRouter } from "next/router";
import React from "react";
import ChallengeOverview from "../../../../components/challenges/challenge-overview";
import QuizList from "../../../../components/quizzes/quiz/quiz-list";
import useMyQuizzesQuery from "../../../../hooks/my-quizzes-query";
import useOpenWeeksQuery from "../../../../hooks/open-weeks";

function MyQuizListPage() {
  const router = useRouter();
  const week = router.query.week ? String(router.query.week) : "ALL";
  const challengeId = String(router.query.cid) || "";
  const { data: openWeeks } = useOpenWeeksQuery();
  const { data: myQuizzes } = useMyQuizzesQuery({ challengeId });

  return (
    <div className="flex flex-col w-5/6 m-auto py-10 gap-10">
      {challengeId && <ChallengeOverview challengeId={challengeId} />}

      <div className="flex flex-col gap-6 py-5 px-10 bg-white rounded-lg shadow-sm border-[1px] border-gray-300 sm:px-5">
        <div className="font-semibold">문제 목록</div>
        {myQuizzes && <QuizList quizzes={myQuizzes} />}
      </div>
    </div>
  );
}

export default MyQuizListPage;
