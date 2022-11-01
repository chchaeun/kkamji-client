import { api } from "../myApi";
import { ChallengeProps } from "./types";
import { openDB } from "idb";
import { authorizationHeader } from "../authHeader";

const fetchMyChallenge = async () => {
  const { data } = await api.get(`/my/challenges`, authorizationHeader);

  if (data) {
    return data;
  } else {
    if ("indexedDB" in window) {
      const idbPromise = await openDB("test-store", 1);
      const store = idbPromise.transaction("test").objectStore("test");
      const values = await store.getAll();
      const challenges = values.map((value) => value);
      return challenges;
    }
  }
};

const fetchChallengeDetail = async ({ challengeId }: ChallengeProps) => {
  const { data } = await api.get(
    `/challenges/${challengeId}`,
    authorizationHeader
  );
  return data;
};

const fetchOpenWeeks = async ({ challengeId }: ChallengeProps) => {
  const { data } = await api.get(
    `/challenges/${challengeId}/weeks`,
    authorizationHeader
  );
  return data;
};

const fetchCurrentWeek = async ({ challengeId }: ChallengeProps) => {
  const { data } = await api.get(
    `/challenges/${challengeId}/now`,
    authorizationHeader
  );
  return data;
};

export {
  fetchMyChallenge,
  fetchChallengeDetail,
  fetchOpenWeeks,
  fetchCurrentWeek,
};
