import { useQuery } from "@tanstack/react-query";
import { fetchMyQuizzes } from "../api/quizzes/my-quizzes";
import { QuizSummary } from "../types/Quiz";

interface Props {
  challengeId: string;
}

export default function useMyQuizzesQuery({ challengeId }: Props) {
  return useQuery<QuizSummary[]>(
    ["myQuizzes", challengeId],
    () => fetchMyQuizzes({ challengeId }),
    {
      enabled: !!challengeId,
    }
  );
}
