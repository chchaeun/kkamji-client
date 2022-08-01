import api from "../my-api";

export interface IQuizAnswer {
  quizId: number;
  quizAnswer: string;
  quizExplanation: string;
  quizSource: string;
}

export const fetchQuizAnswer = async (quizId: string) => {
  const { data } = await api.get(`/quizzes/${quizId}/answer`);
  return data;
};
