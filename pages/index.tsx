import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../api/my-api";
import Banner from "../components/home/banner";
import MobileBanner from "../components/home/mobile-banner";
import MobileNav from "../components/layout/mobile-nav";

interface Challenge {
  challengeId: number;
  challengeTitle: string;
  challengeImage: string;
}

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
  const { data: challenges } = useQuery(["challenges"], async () => {
    const { data } = await api.get("/challenges");
    return data;
  });

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
        <div className="grid grid-cols-3 gap-10 sm:flex sm:flex-col">
          {challenges?.map((challenge: Challenge) => (
            <div
              key={challenge.challengeId}
              className="col-span-1 flex flex-col gap-3 transition ease-in-out hover:-translate-y-1 duration-300 cursor-pointer"
            >
              <img
                src={challenge.challengeImage}
                className="w-96 h-52 object-cover rounded-2xl"
              />
              <div className="text-lg">{challenge.challengeTitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
