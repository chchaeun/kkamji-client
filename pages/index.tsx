import React from "react";
import Banner from "../components/home/banner";
import MobileBanner from "../components/home/mobile-banner";
function HomePage() {
  return (
    <>
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

        {/* <div className="flex flex-col gap-5 mb-32 sm:mx-5">
        <h2 className="text-2xl font-bold">진행 중인 챌린지</h2>
        {challenges && <ChallengeList challenges={challenges} />}
      </div> */}
      </div>
      <footer className="relative w-full h-48 left-0 bottom-0 border-t-[1px] p-10">
        <div>
          <p>Copyright © 2022 - All right reserved by 배워서 남주는 개발자들</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
