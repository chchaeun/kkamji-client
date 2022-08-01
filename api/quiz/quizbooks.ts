import api from "../my-api";

export interface IQuizbook {
  quizbookId: number;
  quizbookTitle: string;
  quizbookDescription: string;
  numOfQuizzes: number;
  quizbookWeek: number;
  submitUserName: string;
}

export const fetchQuizbooks = async (week: string) => {
  const { data } = await api.get(`/quizbooks?week=${week}`);
  return data;
};
