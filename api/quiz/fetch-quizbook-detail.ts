import api from "../my-api";

export interface IQuizbookDetail {
  quizID: number;
  quizType: string;
  isSolved: boolean;
  quizContent: string;
}

export const fetchQuizbookDetail = async () => {
  const {
    data: { result },
  } = await api.get("/quizbook-detail");
  return result;
};
