import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../../api/my-api";
import ChallengeList from "../../components/dashboard/containers/ChallengeListContainer";
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
    <div className="flex flex-col w-2/3 gap-5 pt-10 m-auto">
      <h2 className="text-2xl">깜지 챌린지</h2>
      {challenges && <ChallengeList challenges={challenges} />}
    </div>
  );
}

export default ChallengeListPage;
