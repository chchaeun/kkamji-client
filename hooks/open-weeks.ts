import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { fetchOpenWeeks } from "../api/challenges/open-weeks";
import { OpenWeeks } from "../types/Challenge";

export default function useOpenWeeksQuery() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  return useQuery<OpenWeeks, AxiosError>(
    ["openWeeks", challengeId],
    () => fetchOpenWeeks({ challengeId }),
    {
      enabled: !!challengeId,
    }
  );
}
