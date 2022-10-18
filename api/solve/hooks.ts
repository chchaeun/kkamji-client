import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchQuizSolve } from ".";
import { QuizSolve, QuizSolveSelect } from "../../types/Quiz";
import { QuizProps } from "./types";

function useQuizSolveQuery({ quizId }: QuizProps) {
  return useQuery<QuizSolve, AxiosError, QuizSolveSelect>(
    ["quizSolve", quizId],
    () => fetchQuizSolve({ quizId }),
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
