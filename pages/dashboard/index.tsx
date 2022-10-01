import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../../api/my-api";
import { getCode } from "../../api/session-code";
import ChallengeList from "../../components/dashboard/containers/challenge-list";
import { Challenge } from "../../types/Challenge";

function Dashboard() {
  const { data: myChallenges, error } = useQuery<Challenge[]>(
    ["myChallenges"],
    async () => {
      api.defaults.headers.common["code"] = getCode();
      const { data } = await api.get("/my/challenges");
      return data;
    }
  );
  return (
    <div className="flex flex-col gap-10 m-auto py-[80px] px-[200px] sm:py-[88px] sm:px-[50px]">
      <div className="text-2xl">내 챌린지</div>
      {myChallenges && <ChallengeList challenges={myChallenges} />}
    </div>
  );
}

export default Dashboard;
