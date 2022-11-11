import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QuizSolve, QuizSolveSelect } from "../../types/Quiz";
import { fetchData } from "../utils/fetchData";
import { quizSolveUrl } from "./paths";
import { QuizProps } from "./types";

function useQuizSolveQuery({ quizId }: QuizProps) {
  return useQuery<QuizSolve, AxiosError, QuizSolveSelect>(
    [quizSolveUrl({ quizId })],
    () => fetchData({ url: quizSolveUrl({ quizId }), apiVersion: 2 }),
    {
      enabled: !!quizId,
      select: (data) => {
        return {
          ...data,
          quiz: {
            ...data.quiz,
            rubric: JSON.parse(data.quiz.rubric).map(
              (value: { score: string; content: string }) => {
                return { ...value, score: Number(value.score) };
              }
            ),
          },
        };
      },
    }
  );
}

export { useQuizSolveQuery };
