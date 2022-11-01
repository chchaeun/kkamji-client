import { api } from "../myApi";
import {
  QuizProps,
  QuizRateProps,
  QuizSubmitCountProps,
  QuizSubmitProps,
  QuizzesProps,
} from "./types";
import { authorizationHeader } from "../authHeader";

const fetchQuizzes = async ({ challengeId }: QuizzesProps) => {
  const { data } = await api.get(
    `/challenges/${challengeId}/quizzes`,
    authorizationHeader
  );
  return data;
};

const updateQuiz = async ({ challengeId, quizSubmitBody }: QuizSubmitProps) => {
  api.defaults.headers.common["Content-Type"] = "multipart/form-data";
  return await api.post(
    `/challenges/${challengeId}/quizzes`,
    quizSubmitBody,
    authorizationHeader
  );
};

const fetchQuizDetail = async ({ quizId }: QuizProps) => {
  const { data } = await api.get(
    `/quizzes/${quizId}/content`,
    authorizationHeader
  );
  return data;
};

const fetchMyQuizDetail = async ({ quizId }: QuizProps) => {
  const { data } = await api.get(`/my/quizzes/${quizId}`, authorizationHeader);
  return data;
};

const fetchMyQuizzes = async ({ challengeId }: QuizzesProps) => {
  // week가 없으면 0으로 요청하여 전체 퀴즈 리스트를 반환한다.
  const { data } = await api.get(
    `/challenges/${challengeId}/my/quizzes`,
    authorizationHeader
  );

  return data;
};

const fetchQuizSubmitStackedCount = async () => {
  const { data } = await api.get("/my/quizzes/count", authorizationHeader);
  return data;
};

const fetchSubmitCount = async ({
  challengeId,
  week,
}: QuizSubmitCountProps) => {
  const { data } = await api.get(
    `/challenges/${challengeId}/my/quizzes/count`,
    { params: { week }, ...authorizationHeader }
  );
  return data;
};

const updateQuizRate = async ({ quizId, rate }: QuizRateProps) => {
  return await api.put(
    `/quizzes/${quizId}/rate`,
    { rate },
    authorizationHeader
  );
};

const fetchLikedQuizzes = async ({ challengeId }: QuizzesProps) => {
  const { data } = await api.get(
    `/challenges/${challengeId}/my-good-quizzes`,
    authorizationHeader
  );
  return data;
};

export {
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
