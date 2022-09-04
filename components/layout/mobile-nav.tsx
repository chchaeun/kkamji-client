import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getCode } from "../../api/session-code";
import { showNavState } from "../../stores/header";
import { classNames } from "../../styles/classname-maker";

function MobileNav() {
  const router = useRouter();

  const [showNav, setShowNav] = useRecoilState(showNavState);

  const handleNavigation = () => {
    setShowNav(false);
  };
  const isUser = getCode() ? true : false;

  return (
    <nav
      className={classNames(
        showNav
          ? "flex flex-col justify-between fixed top-0 w-full h-full pt-32 pb-10 px-10 bg-white bg-opacity-95 z-20"
          : "hidden",
        "lg:hidden animate-in fade-in-10"
      )}
    >
      <ul className="flex flex-col gap-5 text-xl" onClick={handleNavigation}>
        <li
          className={classNames(
            router.pathname === "/introduce"
              ? "font-semibold text-black"
              : "text-gray-500"
          )}
        >
          <Link href={"/introduce"}>깜지 소개</Link>
        </li>
        <li
          className={classNames(
            router.pathname === "/manual"
              ? "font-semibold text-black"
              : "text-gray-500"
          )}
        >
          <Link href={"/manual"}>문제 매뉴얼</Link>
        </li>
      </ul>
      {isUser ? (
        <Link href={`/dashboard`}>
          <button
            onClick={handleNavigation}
            className="btn btn-info text-white"
          >
            내 챌린지
          </button>
        </Link>
      ) : (
        <Link href="/login">
          <button
            onClick={handleNavigation}
            className="py-1 px-4 text-base border-[1px] rounded-3xl bg-black text-white"
          >
            로그인
          </button>
        </Link>
      )}
    </nav>
  );
}

export default MobileNav;
