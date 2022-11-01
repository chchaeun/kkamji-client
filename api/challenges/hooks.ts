import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  fetchChallengeDetail,
  fetchCurrentWeek,
  fetchMyChallenge,
  fetchOpenWeeks,
} from ".";
import {
  Challenge,
  CurrentWeek,
  OpenWeeks,
  OpenWeeksSelect,
} from "../../types/Challenge";
import { openDB } from "idb";
import { getJwtToken } from "../getJwtToken";

interface Props {
  challengeId: string;
  suspense?: boolean;
}

function useChallengeDetailQuery({ challengeId, suspense = false }: Props) {
  return useQuery<Challenge, AxiosError>(
    ["challenge", challengeId],
    () => fetchChallengeDetail({ challengeId }),
    { enabled: !!challengeId, suspense }
  );
}

function useCurrentWeekQuery({ challengeId }: Props) {
  return useQuery<CurrentWeek, AxiosError, number>(
    ["currentWeek", challengeId],
    () => fetchCurrentWeek({ challengeId }),
    {
      select: (data) => data.week,
      enabled: !!challengeId,
    }
  );
}

function useOpenWeeksQuery({ challengeId }: Props) {
  return useQuery<OpenWeeks, AxiosError, OpenWeeksSelect>(
    ["openWeeks", challengeId],
    () => fetchOpenWeeks({ challengeId }),
    {
      enabled: !!challengeId,
      select: (data) => {
        return {
          totalWeeks: data.totalWeeks,
          weeks: Object.entries(data.weeks).map(([week, status]) => {
            return { week: Number(week), status };
          }),
        };
      },
    }
  );
}

function useMyChallengeQuery() {
  const { data, isError } = useQuery<Challenge[]>(
    ["myChallenge"],
    fetchMyChallenge,
    {
      enabled: !!getJwtToken(),
      suspense: true,
    }
  );

  let challenges;
  if (data) {
    challenges = data;
  } else if (isError) {
    (async () => {
      if ("indexedDB" in window) {
        const idbPromise = await openDB("test-store", 1);
        const store = idbPromise.transaction("test").objectStore("test");
        const values = await store.getAll();
        challenges = values.map((value) => value);
      }
    })();
  }
  return challenges;
}

export {
  useChallengeDetailQuery,
  useCurrentWeekQuery,
  useOpenWeeksQuery,
  useMyChallengeQuery,
};
