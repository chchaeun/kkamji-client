import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../api/my-api";
import ChallengeList from "../components/challenges/challenge-list";
import Banner from "../components/home/banner";
import MobileBanner from "../components/home/mobile-banner";
import MobileNav from "../components/layout/mobile-nav";
import { Challenge } from "../types/Challenge";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["challenges"], async () => {
    const { data } = await api.get("/challenges");
    return data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function HomePage() {
  const { data: challenges } = useQuery<Challenge[]>(
    ["challenges"],
    async () => {
      const { data } = await api.get("/challenges");
      return data;
    }
  );

  return (
    <div className="flex flex-col my-32 mx-40 gap-36 sm:m-auto sm gap-10">
      <div className="grid grid-cols-3 gap-10 sm:hidden">
        <img
          src="image/kkamji-home.gif"
          alt="종강까지 책임지는 찐한 학점 관리 '깜지'"
          className="col-span-2 w-full h-full object-cover"
        />
        <div className="col-span-1">
          <Banner />
        </div>
      </div>
      <img
        src="image/kkamji-review.png"
        alt="후기"
        className="col-span-3 mx-10 sm:hidden"
      />
      <div className="lg:hidden">
        <MobileBanner />
      </div>
      <img
        src="image/kkamji-mobile-review.png"
        alt="후기"
        className="lg:hidden"
      />

      <div className="flex flex-col gap-5 mb-32 sm:mx-5">
        <h2 className="text-2xl font-bold">진행 중인 챌린지</h2>
        {challenges && <ChallengeList challenges={challenges} />}
      </div>
    </div>
  );
}

export default HomePage;
