import { getToken } from "../getToken";
import { api, apiV2 } from "../myApi";
import { QuizAnswerProps, QuizGradeProps, QuizProps } from "./types";

const updateQuizIsSolved = async ({ quizId, answer }: QuizAnswerProps) => {
  api.defaults.headers.common["jwt"] = getToken();

  return await api.post(`/quizzes/${quizId}/solve`, { answer });
};

const updateQuizGrade = async ({ quizId, scoreBody }: QuizGradeProps) => {
  apiV2.defaults.headers.common["jwt"] = getToken();

  return await apiV2.post(`/quizzes/${quizId}/grade`, scoreBody);
};

const fetchQuizSolve = async ({ quizId }: QuizProps) => {
  apiV2.defaults.headers.common["jwt"] = getToken();

  const { data } = await apiV2.get(`/quizzes/${quizId}/solve`);

  return data;
};

export { updateQuizIsSolved, updateQuizGrade, fetchQuizSolve };
