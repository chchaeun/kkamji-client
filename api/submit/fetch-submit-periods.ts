import api from "../my-api";

export interface ISubmitPeriod {
  userName: string;
  continuousSubmissionPeriod: number;
}
// json-server routing 처리 안돼서 depth 없이 보냄
export const fetchSubmitPeriods = async () => {
  const {
    data: { result },
  } = await api.get("/quizzes-continuous-submission-period");
  return result;
};
