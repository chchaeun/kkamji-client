import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { fetchCurrentWeek } from "../api/challenges/current-week";
import { CurrentWeek } from "../types/Challenge";

export default function useCurrentWeekQuery() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  return useQuery<CurrentWeek, AxiosError, number>(
    ["currentWeek", challengeId],
    () => fetchCurrentWeek({ challengeId }),
    {
      select: (data) => data.week,
      enabled: !!challengeId,
    }
  );
}
