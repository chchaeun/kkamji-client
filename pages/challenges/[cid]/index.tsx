import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { fetchChallengeDetail } from "../../../api/challenges/challenge-detail";
import { fetchMyQuizzes } from "../../../api/quizzes/my-quizzes";
import { fetchQuizzes } from "../../../api/quizzes/quizzes";
import ProgressBar from "@ramonak/react-progress-bar";
import useCurrentWeekQuery from "../../../hooks/current-week-query";
import { Challenge, OpenWeek } from "../../../types/Challenge";
import { QuizSubmitCount, QuizSummary } from "../../../types/Quiz";
import { Icon } from "@iconify/react";
import { getDateFormat } from "../../../utils/date-fotmat";
import { classNames } from "../../../styles/classname-maker";
import { fetchOpenWeek } from "../../../api/challenges/open-weeks";
import { fetchSubmitCount } from "../../../api/submit-quiz/submit-count";
import { AxiosError } from "axios";
import useSubmitCountQuery from "../../../hooks/submit-count-query";

interface QuizSummaryCard {
  title: string;
  quizzes: QuizSummary[];
}

function ChallengePage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);

  const { data: currentWeek } = useCurrentWeekQuery();

  const { data: quizzes } = useQuery<QuizSummary[]>(
    ["quizzes", challengeId],
    () => fetchQuizzes({ challengeId, week: currentWeek || 0 }),
    {
      enabled: !!(challengeId && currentWeek),
    }
  );

  const { data: myQuizzes } = useQuery<QuizSummary[]>(
    ["myQuizzes", challengeId],
    () => fetchMyQuizzes({ challengeId }),
    {
      enabled: !!challengeId,
    }
  );

  const { data: challengeDetail } = useQuery<Challenge>(
    ["challenge", challengeId],
    () => fetchChallengeDetail({ challengeId }),
    { enabled: !!challengeId }
  );

  const { data: openWeek } = useQuery<OpenWeek>(
    ["openWeek", challengeId],
    () => fetchOpenWeek({ challengeId }),
    { enabled: !!challengeId }
  );

  const { data: submitCount } = useSubmitCountQuery();

  const tabMenu = () => {
    const tabMenuList = [
      {
        id: "activity",
        name: "활동",
      },
      {
        id: "introduction",
        name: "챌린지 소개",
      },
    ];

    const isSameParam = (id: string) => {
      if (!router.query.tab && id === "activity") {
        return true;
      }
      return router.query.tab === id;
    };
    return (
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tabMenuList.map((tab) => (
            <li className="mr-2" key={tab.id}>
              <Link href={`/challenges/${challengeId}?tab=${tab.id}`}>
                <a
                  className={classNames(
                    isSameParam(tab.id)
                      ? "text-[#5c3cde] border-[#5c3cde] active"
                      : "hover:text-gray-600 hover:border-gray-300",
                    "inline-block p-4 rounded-t-lg border-b-2 border-transparent"
                  )}
                  aria-current={isSameParam(tab.id) ? "page" : "false"}
                >
                  {tab.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const quizSummaryCard = ({ title, quizzes }: QuizSummaryCard) => {
    return (
      <div className="flex flex-col gap-3 w-1/2 py-5 px-10 bg-white rounded-lg shadow-sm border-[1px] border-gray-300 sm:w-full">
        <Link href={`/challenges/${challengeId}/quizzes`}>
          <a className="block text-xl hover:underline cursor-pointer">
            {title}
          </a>
        </Link>
        <ul>
          {quizzes.slice(0, 5).map((quiz) => (
            <div
              key={quiz.quizId}
              className="flex justify-between text-gray-700"
            >
              <span className="flex gap-1 items-center">
                <Icon icon="material-symbols:quiz-rounded" />
                {quiz.quizTitle}
              </span>
              {getDateFormat(quiz.quizCreatedDate)}
            </div>
          ))}
        </ul>
      </div>
    );
  };

  // 챌린지 미션 성공 또는 실패 횟수를 반환하는 함수이다.
  const missionCount = (successOrFail: string) => {
    if (!openWeek) {
      return 0;
    }

    const successCount = openWeek?.weeks.filter((week) => week === true).length;
    if (successOrFail === "success") {
      return successCount;
    } else {
      const failCount = openWeek.totalWeeks - successCount;
      return failCount;
    }
  };

  return (
    <div className="flex flex-col gap-10 w-2/3 py-10 m-auto sm:w-5/6 sm:pb-10">
      <div className="flex justify-between sm:flex-col sm:gap-5">
        <div className="flex gap-5">
          <img
            src={challengeDetail?.imageUrl}
            width={200}
            className="rounded-xl sm:w-1/3"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">{challengeDetail?.title}</h1>
            <div className="flex flex-col">
              <span className="text-gray-700">
                {challengeDetail?.university} {challengeDetail?.department}
              </span>
              <span className="text-gray-700">
                {challengeDetail?.professorName} 교수님
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Link href={`/challenges/${challengeId}/write`}>
            <button className="w-fit h-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline cursor-pointer sm:w-full">
              문제 작성
            </button>
          </Link>
          <div className="flex items-center">
            이번주{" "}
            <Icon icon={`carbon:number-${submitCount}`} className="text-3xl" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <span className="flex items-center gap-2 text-lg">
          현재 {currentWeek} 주차 <Icon icon="mdi:run-fast" />
        </span>
        {currentWeek && (
          <ProgressBar
            completed={currentWeek}
            maxCompleted={challengeDetail?.totalWeeks}
            bgColor={"#5c3cde"}
            baseBgColor={"#f7f6fc"}
            animateOnRender={true}
            labelAlignment={"outside"}
            customLabel={`${challengeDetail?.totalWeeks}주`}
            labelColor={"#000000"}
            labelClassName={"w-1/12 text-sm px-3 sm:w-1/5"}
          />
        )}
      </div>
      {openWeek && currentWeek && (
        <div className="flex flex-col gap-5">
          <span className="flex items-center gap-2 text-lg">
            미션 달성률 <Icon icon="icon-park-solid:success" />
          </span>
          <div className="flex flex-col gap-3">
            <p className="text-gray-700">
              지금부터 매주 미션을 성공하면 최대{" "}
              {Math.floor(
                ((missionCount("success") +
                  openWeek?.totalWeeks -
                  currentWeek) /
                  openWeek.totalWeeks) *
                  100
              )}
              %까지 달성 가능합니다!
            </p>
            <ProgressBar
              completed={missionCount("success")}
              maxCompleted={challengeDetail?.totalWeeks}
              bgColor={"#5c3cde"}
              baseBgColor={"#f7f6fc"}
              animateOnRender={true}
              labelAlignment={"outside"}
              customLabel={`${Math.floor(
                (missionCount("success") / openWeek?.totalWeeks) * 100
              )}%`}
              labelColor={"#000000"}
              labelClassName={"w-1/12 text-sm px-3 sm:w-1/5"}
            />
          </div>

          <div className="flex flex-col gap-5 py-5 px-10 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
            <div className="flex gap-10 w-1/3 text-gray-700 text-sm sm:w-full sm:gap-5">
              <div className="flex flex-col">
                <span>미션 성공</span>
                <span className="text-lg font-semibold">
                  {missionCount("success")}
                </span>
              </div>
              <div className="flex flex-col">
                <span>미션 실패</span>
                <span className="text-lg font-semibold">
                  {missionCount("fail")}
                </span>
              </div>
              <div className="flex flex-col">
                <span>남은 미션</span>
                <span className="text-lg font-semibold">
                  {openWeek.totalWeeks - currentWeek}
                </span>{" "}
              </div>
            </div>
            <div className="flex gap-2 text-sm sm:grid sm:grid-cols-5">
              {Array.from({ length: openWeek.totalWeeks }, (v, i) => i + 1).map(
                (week, index) => (
                  <span
                    key={index}
                    className={classNames(
                      openWeek.weeks.length > index && openWeek.weeks[index]
                        ? "bg-[#a085ff] text-white"
                        : "bg-[#ebebeb]",
                      "flex justify-center items-center w-7 h-7 rounded font-semibold"
                    )}
                  >
                    {openWeek.weeks.length <= index
                      ? week
                      : openWeek.weeks[index]
                      ? week
                      : "X"}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
      {tabMenu()}
      {(!router.query.tab || router.query.tab === "activity") && (
        <div className="flex justify-center gap-5 sm:flex-col">
          {quizzes && quizSummaryCard({ title: "전체 문제", quizzes })}
          {myQuizzes &&
            quizSummaryCard({ title: "내가 낸 문제", quizzes: myQuizzes })}
        </div>
      )}
    </div>
  );
}

export default ChallengePage;
