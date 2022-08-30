import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../../api/my-api";
import ChallengeList from "../../components/challenges/challenge-list";
import { Challenge } from "../../types/Challenge";

function ChallengeListPage() {
  const { data: challenges } = useQuery<Challenge[]>(
    ["challenges"],
    async () => {
      const { data } = await api.get("/challenges");
      return data;
    }
  );

  return <div>{challenges && <ChallengeList challenges={challenges} />}</div>;
}

export default ChallengeListPage;
