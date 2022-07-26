import api from "../my-api";

export const postAnswerCheck = async (isCorrect: boolean) => {
  return await api.post("/quiz-answer-check", { isCorrect });
};
