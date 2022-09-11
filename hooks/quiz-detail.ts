import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { fetchQuizDetail } from "../api/quizzes/quiz-detail";
import { QuizDetail, QuizDetailSelect } from "../types/Quiz";
export default function useQuizDetailQuery() {
  const router = useRouter();
  const quizId = String(router.query.qid);
  return useQuery<QuizDetail, AxiosError, QuizDetailSelect>(
    ["quizDetail", quizId],
    () => fetchQuizDetail({ quizId }),
    {
      enabled: !!router.query.qid,
      onError: (err) => {},
      select: (data) => {
        return { ...data, quizRubric: JSON.parse(data.quizRubric) };
      },
    }
  );
}
