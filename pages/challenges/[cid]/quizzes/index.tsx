import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { fetchQuizzes } from "../../../../api/quizzes/quizzes";
import ChallengeOverview from "../../../../components/challenges/challenge-overview";
import QuizList from "../../../../components/quizzes/quiz/quiz-list";
import OpenWeekList from "../../../../components/quizzes/week/open-weeks";
import useChallengeDetailQuery from "../../../../hooks/challenge-detail-query";
import useOpenWeeksQuery from "../../../../hooks/open-weeks";

function QuizListPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const week = String(router.query.week);

  const { data: challengeDetail } = useChallengeDetailQuery();

  const { data: openWeeks } = useOpenWeeksQuery();

  const { data: quizzes } = useQuery(
    ["quizzes"],
    () => fetchQuizzes({ challengeId, week: 0 }),
    {
      enabled: !!challengeId,
    }
  );

  return (
    <div className="flex flex-col w-5/6 m-auto py-10 gap-10">
      {challengeDetail && (
        <ChallengeOverview challengeDetail={challengeDetail} />
      )}
      <div className="flex flex-col gap-3 py-5 px-10 bg-white rounded-lg shadow-sm border-[1px] border-gray-300 sm:px-5">
        <div className="font-semibold">주차별 보기</div>
        {openWeeks && <OpenWeekList openWeeks={openWeeks} />}
      </div>
      <div className="flex flex-col gap-6 py-5 px-10 bg-white rounded-lg shadow-sm border-[1px] border-gray-300 sm:px-5">
        <div className="font-semibold">{week}주차 문제</div>
        <QuizList quizzes={quizzes} />
      </div>
    </div>
  );
}

export default QuizListPage;
