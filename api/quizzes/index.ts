import { QuizRateProps, QuizSubmitProps, QuizzesProps } from "./types";
import { authorizationHeader } from "../utils/authHeader";
import { apiV1 } from "../utils/myApi";

const updateQuiz = async ({ challengeId, quizSubmitBody }: QuizSubmitProps) => {
  apiV1.defaults.headers.common["Content-Type"] = "multipart/form-data";
  return await apiV1.post(
    `/challenges/${challengeId}/quizzes`,
    quizSubmitBody,
    {
      headers: authorizationHeader,
    }
  );
};

const updateQuizRate = async ({ quizId, rate }: QuizRateProps) => {
  return await apiV1.put(
    `/quizzes/${quizId}/rate`,
    { rate },
    { headers: authorizationHeader }
  );
};

export { updateQuiz, updateQuizRate };
