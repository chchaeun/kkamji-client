import api from "../my-api";
import { getCode } from "../session-code";
import { IFetchQuiz } from "../fetch-types";
export interface IQuizIsSolved {
  userId: number;
  userName: string;
  quizId: number;
  quizIsSolved: boolean;
}
export const updateQuizIsSolved = async (props: {
  idData: IFetchQuiz;
  solveIsCorrect: boolean;
}) => {
  api.defaults.headers.common["code"] = getCode() || "";

  const {
    idData: { chapterId, quizbookId, quizId },
    solveIsCorrect,
  } = props;
  return await api.post(
    `/chapters/${chapterId}/quizbooks/${quizbookId}/quizzes/${quizId}/solve`,
    { solveIsCorrect }
  );
};
