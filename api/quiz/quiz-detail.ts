import api from "../my-api";

export interface IQuizDetail {
  quizbookId: number;
  quizbookTitle: string;
  quizbookWeek: number;
  submitUserName: string;
  quizId: number;
  quizTitle: string;
  quizContent: string;
  quizCategory: string;
}

export const fetchQuizDetail = async (quizId: string) => {
  const { data } = await api.get(`/quizzes/${quizId}/content`);
  return data;
};
