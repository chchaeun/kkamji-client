import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { showNavState } from "../../stores/header";
function Header() {
  const router = useRouter();
  const [showNav, setShowNav] = useRecoilState(showNavState);
  const onRankingClick = () => {
    setShowNav((prev) => !prev);
  };
  return (
    <>
      {router.pathname !== "/login" && (
        <nav className="flex bg-white fixed w-screen top-0 left-0 z-50 justify-between items-center border-b-2 border-gray-100 font-summer text-3xl p-3">
          <Link href="/">깜지.</Link>
          {showNav ? (
            <Icon
              icon="bi:x-lg"
              onClick={onRankingClick}
              className="lg:hidden cursor-pointer"
            />
          ) : (
            <Icon
              icon="charm:menu-hamburger"
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
