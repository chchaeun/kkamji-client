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
  let queryOptions;
  switch (page) {
    case "READABLE":
      queryFn = () => fetchQuizzes({ challengeId, week: week || "" });
      queryOptions = {
        enabled: !!(challengeId && week),
        suspense,
        select: (data: QuizSummary[]) => {
          const orderData = data.sort(function (a, b) {
            return +new Date(b.quizCreatedDate) - +new Date(a.quizCreatedDate);
          });
          return orderData;
        },
      };
      break;
    case "MY":
      queryFn = () => fetchMyQuizzes({ challengeId });
      queryOptions = {
        enabled: !!challengeId,
        suspense,
        select: (data: QuizSummary[]) => {
          const orderData = data.sort(function (a, b) {
            return +new Date(b.quizCreatedDate) - +new Date(a.quizCreatedDate);
          });
          return orderData;
        },
      };
      break;
    case "LIKED":
      queryFn = () => fetchLikedQuizzes({ challengeId });
      queryOptions = {
        enabled: !!challengeId,
        suspense,
        select: (data: QuizSummary[]) => {
          const orderData = data.sort(function (a, b) {
            return +new Date(b.quizCreatedDate) - +new Date(a.quizCreatedDate);
          });
          return orderData;
        },
      };
      break;
  }
  return useQuery<QuizSummary[]>(queryKey, queryFn, queryOptions);
}
