import { useQuery } from "@tanstack/react-query";
import { fetchLikedQuizzes } from "../api/quizzes/liked-quizzes";
import { fetchMyQuizzes } from "../api/quizzes/my-quizzes";
import { fetchQuizzes } from "../api/quizzes/quizzes";
import { QuizSummary } from "../types/Quiz";

interface Props {
  challengeId: string;
  week?: string;
  page: "READABLE" | "MY" | "LIKED";
  suspense?: boolean;
}

export default function useQuizzesQuery({
  challengeId,
  week,
  page,
  suspense = false,
}: Props) {
  const queryKey = ["quizzes", page, challengeId];
  let queryFn;
  let queryOptions = {
    enabled: true,
    suspense,
    select: (data: QuizSummary[]) => {
      const orderData = data.sort(function (a, b) {
        return +new Date(b.quizCreatedDate) - +new Date(a.quizCreatedDate);
      });
      return orderData;
    },
  };

  switch (page) {
    case "READABLE":
      queryFn = () => fetchQuizzes({ challengeId, week: week || "" });
      queryOptions = {
        ...queryOptions,
        enabled: !!(challengeId && week),
      };
      break;
    case "MY":
      queryFn = () => fetchMyQuizzes({ challengeId });
      queryOptions = {
        ...queryOptions,
        enabled: !!challengeId,
      };
      break;
    case "LIKED":
      queryFn = () => fetchLikedQuizzes({ challengeId });
      queryOptions = {
        ...queryOptions,
        enabled: !!challengeId,
      };
      break;
  }
  return useQuery<QuizSummary[]>(queryKey, queryFn, queryOptions);
}
