import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../../api/my-api";
import ChallengeList from "../../components/dashboard/containers/challenge-list";
import { Challenge } from "../../types/Challenge";

function ChallengeListPage() {
  const { data: challenges } = useQuery<Challenge[]>(
    ["challenges"],
    async () => {
      const { data } = await api.get("/challenges");
      return data;
    }
  );

  return (
    <div className="flex flex-col gap-5 w-2/3 m-auto pt-10">
      <h2 className="text-2xl">깜지 챌린지</h2>
      {challenges && <ChallengeList challenges={challenges} />}
    </div>
  );
}

export default ChallengeListPage;
