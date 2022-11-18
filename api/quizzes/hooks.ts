import { useQuery } from "@tanstack/react-query";
import {
  MyQuizDetail,
  MyQuizDetailSelect,
  QuizDetail,
  QuizSubmitCount,
  QuizSummary,
} from "../../types/Quiz";
import { fetchData } from "../utils/fetchData";
import { getJwtToken } from "../utils/getJwtToken";
import {
  myQuizDetailUrl,
  quizDetailUrl,
  quizListUrl,
  submitCountUrl,
  submitStackedCountUrl,
} from "./paths";

interface QuizProps {
  quizId: string;
}

interface MyQuizProps {
  quizId: string;
  successHandler?: Function;
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
  return useQuery<QuizDetail, Error>(
    [quizDetailUrl({ quizId })],
    () => fetchData({ url: quizDetailUrl({ quizId }) }),
    {
      enabled: !!quizId,
      onError: (err) => {},
    }
  );
}

function useMyQuizDetailQuery({ quizId, successHandler }: MyQuizProps) {
  return useQuery<MyQuizDetail, Error, MyQuizDetailSelect>(
    [myQuizDetailUrl({ quizId })],
    () => fetchData({ url: myQuizDetailUrl({ quizId }) }),
    {
      select: (quizDetail) => {
        return { ...quizDetail, quizRubric: JSON.parse(quizDetail.quizRubric) };
      },
      enabled: !!quizId,
      onSuccess: (data) => {
        if (successHandler) {
          successHandler(data);
        }
      },
    }
  );
}

function useQuizzesQuery({
  challengeId,
  page,
  suspense = false,
}: QuizzesProps) {
  const queryKey = [quizListUrl({ challengeId, page })];
  let queryFn = () => fetchData({ url: quizListUrl({ challengeId, page }) });
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

  return useQuery<QuizSummary[]>(queryKey, queryFn, queryOptions);
}

function useSubmitCountQuery({ challengeId, week }: QuizSubmitCountProps) {
  return useQuery<QuizSubmitCount, Error, number>(
    [submitCountUrl({ challengeId })],
    () => fetchData({ url: submitCountUrl({ challengeId }), params: { week } }),
    {
      select: (data) => data.count,
      enabled: !!(challengeId && week),
    }
  );
}

function useQuizSubmitStackedCount() {
  return useQuery<{ week: number; count: number }[], Error, number[]>(
    [submitStackedCountUrl],
    () => fetchData({ url: submitStackedCountUrl }),
    {
      enabled: !!getJwtToken(),
      suspense: true,
      select: (data) => data.map((value) => value.count),
    }
  );
}

export {
  useQuizDetailQuery,
  useMyQuizDetailQuery,
  useQuizzesQuery,
  useSubmitCountQuery,
  useQuizSubmitStackedCount,
};
