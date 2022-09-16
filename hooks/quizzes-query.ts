import { useQuery } from "@tanstack/react-query";
import { fetchLikedQuizzes } from "../api/quizzes/liked-quizzes";
import { fetchMyQuizzes } from "../api/quizzes/my-quizzes";
import { fetchQuizzes } from "../api/quizzes/quizzes";
import { QuizSummary } from "../types/Quiz";

interface Props {
  challengeId: string;
  week?: string;
  filter: "READABLE" | "MY" | "LIKED";
}

export default function useQuizzesQuery({ challengeId, week, filter }: Props) {
  const queryKey = [filter, challengeId];
  let queryFn;
  let queryOptions;
  switch (filter) {
    case "READABLE":
      queryFn = () => fetchQuizzes({ challengeId, week: week || "" });
      queryOptions = { enabled: !!(challengeId && week), suspense: true };
    case "MY":
      queryFn = () => fetchMyQuizzes({ challengeId });
      queryOptions = { enabled: !!challengeId, suspense: true };
    case "LIKED":
      queryFn = () => fetchLikedQuizzes({ challengeId });
      queryOptions = { enabled: !!challengeId, suspense: true };
  }

  return useQuery<QuizSummary[]>(queryKey, queryFn, queryOptions);
}
