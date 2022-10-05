import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchCurrentWeek } from "../api/challenges/current-week";
import { CurrentWeek } from "../types/Challenge";
interface Props {
  challengeId: string;
}
export default function useCurrentWeekQuery({ challengeId }: Props) {
  return useQuery<CurrentWeek, AxiosError, number>(
    ["currentWeek", challengeId],
    () => fetchCurrentWeek({ challengeId }),
    {
      select: (data) => data.week,
      enabled: !!challengeId,
    }
  );
}
