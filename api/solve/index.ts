import { authorizationHeader } from "../authHeader";
import { api, apiV2 } from "../myApi";
import { QuizAnswerProps, QuizGradeProps, QuizProps } from "./types";

const updateQuizIsSolved = async ({ quizId, answer }: QuizAnswerProps) => {
  return await api.post(
    `/quizzes/${quizId}/solve`,
    { answer },
    authorizationHeader
  );
};

const updateQuizGrade = async ({ quizId, scoreBody }: QuizGradeProps) => {
  return await apiV2.post(
    `/quizzes/${quizId}/grade`,
    scoreBody,
    authorizationHeader
  );
};

const fetchQuizSolve = async ({ quizId }: QuizProps) => {
  const { data } = await apiV2.get(
    `/quizzes/${quizId}/solve`,
    authorizationHeader
  );

  return data;
};

export { updateQuizIsSolved, updateQuizGrade, fetchQuizSolve };
