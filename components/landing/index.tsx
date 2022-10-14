import LandingBanner from "./LandingBanner";
import LandingMobileBanner from "./LandingMobileBanner";

function LandingPage() {
  return (
    <>
      <div className="flex flex-col gap-36 sm:m-auto sm:gap-10  py-[120px] px-[200px] sm:py-[88px] sm:px-[12px]">
        <div className="grid grid-cols-3 gap-10 sm:hidden">
          <img
            src="image/kkamji-home.gif"
            alt="종강까지 책임지는 찐한 학점 관리 '깜지'"
            className="object-cover w-full h-full col-span-2"
          />
          <div className="col-span-1">
            <LandingBanner />
          </div>
        </div>
        <img
          src="image/kkamji-review.png"
          alt="후기"
          className="col-span-3 mx-10 sm:hidden"
        />
        <div className="lg:hidden">
          <LandingMobileBanner />
        </div>
        <img
          src="image/kkamji-mobile-review.png"
          alt="후기"
          className="lg:hidden"
        />
      </div>
      <footer className="relative w-full h-48 left-0 bottom-0 border-t-[1px] p-10">
        <div>
          <p>Copyright © 2022 - All right reserved by 배워서 남주는 개발자들</p>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
