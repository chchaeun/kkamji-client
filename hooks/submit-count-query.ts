import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { fetchSubmitCount } from "../api/submit-quiz/submit-count";
import { QuizSubmitCount } from "../types/Quiz";
import useCurrentWeekQuery from "./current-week-query";

export default function useSubmitCountQuery() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const { data: currentWeek } = useCurrentWeekQuery();
  return useQuery<QuizSubmitCount, AxiosError, number>(
    ["quizSubmit", challengeId],
    () => fetchSubmitCount({ challengeId, week: currentWeek || 0 }),
    {
      select: (data) => data.count,
      enabled: !!(challengeId && currentWeek),
    }
  );
}
