import { QuizRateProps, QuizSubmitProps, QuizzesProps } from "./types";
import { authorizationHeader } from "../utils/authHeader";
import { apiV1 } from "../utils/myApi";
import { getJwtToken } from "../utils/getJwtToken";

const updateQuiz = async ({ challengeId, quizSubmitBody }: QuizSubmitProps) => {
  apiV1.defaults.headers.common["Content-Type"] = "multipart/form-data";
  return await apiV1.post(
    `/challenges/${challengeId}/quizzes`,
    quizSubmitBody,
    {
      headers: authorizationHeader(getJwtToken()),
    }
  );
};

const updateQuizRate = async ({ quizId, rate }: QuizRateProps) => {
  return await apiV1.put(
    `/quizzes/${quizId}/rate`,
    { rate },
    { headers: authorizationHeader(getJwtToken()) }
  );
};

export { updateQuiz, updateQuizRate };
