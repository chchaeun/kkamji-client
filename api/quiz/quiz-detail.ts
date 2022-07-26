import api from "../my-api";

export interface IQuizDetail {
  quizPacakageID: number;
  quizID: number;
  quizContent: {
    example: string[] | null;
    problem: string;
  };
  quizType: string;
  quizAnswers: string[];
  isSolved: boolean;
}

export const fetchQuizDetail = async () => {
  const {
    data: { result },
  } = await api.get("/quiz-detail");
  return result;
};
