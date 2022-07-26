import api from "../my-api";

export interface IQuizBook {
  quizPackageID: number;
  quizPackageCost: number;
  isOwned: boolean;
  quizNum: number;
  choiceQuizNum: number;
  shortQuizNum: number;
  longQuizNum: number;
  keywords: string[];
}

export const fetchQuizbooks = async () => {
  const {
    data: { result },
  } = await api.get("/quizbooks");
  return result;
};
