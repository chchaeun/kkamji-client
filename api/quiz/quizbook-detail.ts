import api from "../my-api";

export interface IQuizbookDetail {
  quizbookId: number;
  quizbookTitle: string;
  quizbookDescription: string;
  quizbookWeek: number;
  numOfQuizzes: number;
  submitUserName: string;
  quizzes: {
    quizId: number;
    quizTitle: string;
    quizCategory: string;
    quizIsSolved: boolean;
  }[];
}

export const fetchQuizbookDetail = async (quizbookId: string) => {
  const { data } = await api.get(`/quizbooks/${quizbookId}`);
  return data;
};
