import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { showRankingState } from "../../stores/header";
function Header() {
  const router = useRouter();
  const [showRanking, setShowRanking] = useRecoilState(showRankingState);
  const onRankingClick = () => {
    setShowRanking((prev) => !prev);
    console.log(showRanking);
  };
  return (
    <>
      {router.pathname !== "/login" && (
        <nav className="flex bg-white sticky top-0 left-0 z-50 justify-between items-center border-b-2 border-gray-100 font-summer text-3xl p-3">
          <Link href="/">깜지.</Link>
          {showRanking ? (
            <Icon
              icon="bi:x-lg"
              onClick={onRankingClick}
              className="lg:hidden cursor-pointer"
            />
          ) : (
            <Icon
              icon="fa6-solid:ranking-star"
              onClick={onRankingClick}
              className="lg:hidden cursor-pointer"
            />
          )}
        </nav>
      )}
    </>
  );
}

export default Header;
