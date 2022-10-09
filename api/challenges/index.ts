import api from "../my-api";
import { getCode } from "../session-code";
import { ChallengeProps } from "./types";

const fetchMyChallenge = async () => {
  api.defaults.headers.common["code"] = getCode();

  const { data } = await api.get(`/my/challenges`);
  return data;
};

const fetchChallengeDetail = async ({ challengeId }: ChallengeProps) => {
  api.defaults.headers.common["code"] = getCode();

  const { data } = await api.get(`/challenges/${challengeId}`);
  return data;
};

const fetchOpenWeeks = async ({ challengeId }: ChallengeProps) => {
  api.defaults.headers.common["code"] = getCode();

  const { data } = await api.get(`/challenges/${challengeId}/weeks`);
  return data;
};

const fetchCurrentWeek = async ({ challengeId }: ChallengeProps) => {
  api.defaults.headers.common["code"] = getCode();

  const { data } = await api.get(`/challenges/${challengeId}/now`);
  return data;
};

export {
  fetchMyChallenge,
  fetchChallengeDetail,
  fetchOpenWeeks,
  fetchCurrentWeek,
};