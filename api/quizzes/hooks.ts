import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  fetchLikedQuizzes,
  fetchMyQuizzes,
  fetchQuizDetail,
  fetchQuizzes,
  fetchSubmitCount,
} from ".";
import { QuizDetail, QuizSubmitCount, QuizSummary } from "../../types/Quiz";

interface QuizProps {
  quizId: string;
}

interface QuizzesProps {
  challengeId: string;
  week?: string;
  page: "READABLE" | "MY" | "LIKED";
  suspense?: boolean;
}

interface QuizSubmitCountProps {
  challengeId: string;
  week: number;
}

function useQuizDetailQuery({ quizId }: QuizProps) {
  return useQuery<QuizDetail, AxiosError>(
    ["quizDetail", quizId],
    () => fetchQuizDetail({ quizId }),
    {
      enabled: !!quizId,
      onError: (err) => {},
    }
  );
}

function useQuizzesQuery({
  challengeId,
  page,
  suspense = false,
}: QuizzesProps) {
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
      queryFn = () => fetchQuizzes({ challengeId });
      queryOptions = {
        ...queryOptions,
        enabled: !!challengeId,
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

function useSubmitCountQuery({ challengeId, week }: QuizSubmitCountProps) {
  return useQuery<QuizSubmitCount, AxiosError, number>(
    ["quizSubmit", challengeId],
    () => fetchSubmitCount({ challengeId, week }),
    {
      select: (data) => data.count,
      enabled: !!(challengeId && week),
    }
  );
}

export { useQuizDetailQuery, useQuizzesQuery, useSubmitCountQuery };
