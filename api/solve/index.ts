import { authorizationHeader } from "../utils/authHeader";
import { getJwtToken } from "../utils/getJwtToken";
import { apiV1, apiV2 } from "../utils/myApi";
import { QuizAnswerProps, QuizGradeProps } from "./types";

const updateQuizIsSolved = async ({ quizId, answer }: QuizAnswerProps) => {
  return await apiV1.post(
    `/quizzes/${quizId}/solve`,
    { answer },
    { headers: authorizationHeader(getJwtToken()) }
  );
};

const updateQuizGrade = async ({ quizId, scoreBody }: QuizGradeProps) => {
  return await apiV2.post(`/quizzes/${quizId}/grade`, scoreBody, {
    headers: authorizationHeader(getJwtToken()),
  });
};

export { updateQuizIsSolved, updateQuizGrade };
