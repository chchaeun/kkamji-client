import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchChallengeDetail, fetchCurrentWeek, fetchOpenWeeks } from ".";
import {
  Challenge,
  CurrentWeek,
  OpenWeeks,
  OpenWeeksSelect,
} from "../../types/Challenge";

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

export { useChallengeDetailQuery, useCurrentWeekQuery, useOpenWeeksQuery };
