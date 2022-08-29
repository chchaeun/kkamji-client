import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { fetchChallengeDetail } from "../api/challenges/challenge-detail";
import { Challenge } from "../types/Challenge";

export default function useChallengeDetailQuery() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  return useQuery<Challenge, AxiosError>(
    ["challenge", challengeId],
    () => fetchChallengeDetail({ challengeId }),
    { enabled: !!challengeId }
  );
}
