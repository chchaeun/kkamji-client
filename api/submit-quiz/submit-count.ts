import api from "../my-api";
import { getCode } from "../session-code";
interface Props {
  challengeId: string;
  week: number;
}
export const fetchSubmitCount = async ({ challengeId, week }: Props) => {
  api.defaults.headers.common["code"] = getCode();
  const { data } = await api.get(
    `/challenges/${challengeId}/my/quizzes/count`,
    { params: { week } }
  );
  return data;
};
