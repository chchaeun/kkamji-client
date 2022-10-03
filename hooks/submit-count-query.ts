import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchSubmitCount } from "../api/submit-quiz/submit-count";
import { QuizSubmitCount } from "../types/Quiz";

interface Props {
  challengeId: string;
  week: number;
}
export default function useSubmitCountQuery({ challengeId, week }: Props) {
  return useQuery<QuizSubmitCount, AxiosError, number>(
    ["quizSubmit", challengeId],
    () => fetchSubmitCount({ challengeId, week }),
    {
      select: (data) => data.count,
      enabled: !!(challengeId && week),
    }
  );
}
