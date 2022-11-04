import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchData } from "../utils/fetchData";
import {
  Challenge,
  CurrentWeek,
  OpenWeeks,
  OpenWeeksSelect,
} from "../../types/Challenge";
import { getJwtToken } from "../utils/getJwtToken";
import {
  challengeDetailUrl,
  currentWeekUrl,
  MY_CHALLENGE,
  openWeeksUrl,
} from "./paths";

interface Props {
  challengeId: string;
  suspense?: boolean;
}

function useChallengeDetailQuery({ challengeId, suspense = false }: Props) {
  return useQuery<Challenge, AxiosError>(
    [challengeDetailUrl({ challengeId })],
    () => fetchData({ url: challengeDetailUrl({ challengeId }) }),
    { enabled: !!challengeId, suspense }
  );
}

function useCurrentWeekQuery({ challengeId }: Props) {
  return useQuery<CurrentWeek, AxiosError, number>(
    [currentWeekUrl({ challengeId })],
    () => fetchData({ url: currentWeekUrl({ challengeId }) }),
    {
      select: (data) => data.week,
      enabled: !!challengeId,
    }
  );
}

function useOpenWeeksQuery({ challengeId }: Props) {
  return useQuery<OpenWeeks, AxiosError, OpenWeeksSelect>(
    [openWeeksUrl({ challengeId })],
    () => fetchData({ url: openWeeksUrl({ challengeId }) }),
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
  return useQuery<Challenge[]>(
    [MY_CHALLENGE],
    () => fetchData({ url: MY_CHALLENGE }),
    {
      enabled: !!getJwtToken(),
      suspense: true,
    }
  );
}

export {
  useChallengeDetailQuery,
  useCurrentWeekQuery,
  useOpenWeeksQuery,
  useMyChallengeQuery,
};
