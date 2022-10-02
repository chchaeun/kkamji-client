import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { fetchChallengeDetail } from "../api/challenges/challenge-detail";
import { Challenge } from "../types/Challenge";

interface Props {
  challengeId: string;
  suspense: boolean;
}

export default function useChallengeDetailQuery({
  challengeId,
  suspense = false,
}: Props) {
  return useQuery<Challenge, AxiosError>(
    ["challenge", challengeId],
    () => fetchChallengeDetail({ challengeId }),
    { enabled: !!challengeId, suspense }
  );
}
