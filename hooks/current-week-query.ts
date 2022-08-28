import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchCurrentWeek } from "../api/challenges/current-week";
import { CurrentWeek } from "../types/Challenge";

export default function useCurrentWeekQuery() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  return useQuery<CurrentWeek>(
    ["currentWeek", challengeId],
    () => fetchCurrentWeek({ challengeId }),
    {
      enabled: !!challengeId,
    }
  );
}
