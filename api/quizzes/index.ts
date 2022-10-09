import api from "../my-api";
import { getCode } from "../session-code";
import {
  QuizAnswerProps,
  QuizGradeProps,
  QuizProps,
  QuizRateProps,
  QuizSubmitCountProps,
  QuizSubmitProps,
  QuizzesProps,
} from "./types";

const updateQuizIsSolved = async ({ quizId, answer }: QuizAnswerProps) => {
  api.defaults.headers.common["code"] = getCode();

  return await api.post(`/quizzes/${quizId}/solve`, { answer });
};

const updateQuizGrade = async ({ quizId, score }: QuizGradeProps) => {
  api.defaults.headers.common["code"] = getCode();

  return await api.post(`/quizzes/${quizId}/grade`, { score });
};

const fetchQuizzes = async ({ challengeId, week }: QuizzesProps) => {
  api.defaults.headers.common["code"] = getCode();

  const { data } = await api.get(`/challenges/${challengeId}/quizzes`, {
    params: { week },
  });
  return data;
};

const updateQuiz = async ({ challengeId, quizSubmitBody }: QuizSubmitProps) => {
  api.defaults.headers.common["code"] = getCode();
  api.defaults.headers.common["Content-Type"] = "multipart/form-data";
  return await api.post(`/challenges/${challengeId}/quizzes`, quizSubmitBody);
};

const fetchQuizDetail = async ({ quizId }: QuizProps) => {
  api.defaults.headers.common["code"] = getCode() || "";

  const { data } = await api.get(`/quizzes/${quizId}`);
  return data;
};

const fetchMyQuizDetail = async ({ quizId }: QuizProps) => {
  const { data } = await api.get(`/my/quizzes/${quizId}`);
  return data;
};

const fetchMyQuizzes = async ({ challengeId }: QuizzesProps) => {
  api.defaults.headers.common["code"] = getCode();

  // week가 없으면 0으로 요청하여 전체 퀴즈 리스트를 반환한다.
  const { data } = await api.get(`/challenges/${challengeId}/my/quizzes`);

  return data;
};

const fetchQuizSubmitStackedCount = async () => {
  api.defaults.headers.common["code"] = getCode();

  const { data } = await api.get("/my/quizzes/count");
  return data;
};

const fetchSubmitCount = async ({
  challengeId,
  week,
}: QuizSubmitCountProps) => {
  api.defaults.headers.common["code"] = getCode();
  const { data } = await api.get(
    `/challenges/${challengeId}/my/quizzes/count`,
    { params: { week } }
  );
  return data;
};

const updateQuizRate = async ({ quizId, rate }: QuizRateProps) => {
  api.defaults.headers.common["code"] = getCode();

  return await api.put(`/quizzes/${quizId}/rate`, { rate });
};

const fetchLikedQuizzes = async ({ challengeId }: QuizzesProps) => {
  api.defaults.headers.common["code"] = getCode();

  const { data } = await api.get(`/challenges/${challengeId}/my-good-quizzes`);
  return data;
};

export {
  updateQuizIsSolved,
  updateQuizGrade,
  fetchQuizzes,
  updateQuiz,
  fetchQuizDetail,
  fetchMyQuizDetail,
  fetchQuizSubmitStackedCount,
  fetchSubmitCount,
  fetchMyQuizzes,
  updateQuizRate,
  fetchLikedQuizzes,
};
