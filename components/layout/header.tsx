import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { showNavState } from "../../stores/header";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { classNames } from "../../styles/classname-maker";
import { getCode } from "../../api/session-code";
import MobileNav from "./mobile-nav";
function Header() {
  const router = useRouter();
  const [showNav, setShowNav] = useRecoilState(showNavState);

  const isUser = getCode() ? true : false;

  const { data: currentChapter } = useQuery<{ currentChapterId: number }>(
    ["currentChapter"],
    async () => {
      const { data } = await axios.get(
        "https://a61e9270-0366-4013-a651-fbc3d46384ab.mock.pstmn.io/v1/current-chapter"
      );
      return data;
    }
  );

  const onRankingClick = () => {
    setShowNav((prev) => !prev);
  };

  // route 판단 함수 추가

  const isSameRoute = (route: string) => {
    if (router.pathname === route) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <MobileNav />
      {!isSameRoute("/login") && (
        <div className="flex sticky w-full top-0 left-0 bg-white z-50 justify-between items-center border-b-2 border-gray-100 text-3xl py-3 px-5">
          <nav className="flex gap-20 sm:w-full sm:justify-between">
            <Link href="/">
              <h1 className="logo cursor-pointer">깜지.</h1>
            </Link>
            <ul className="flex items-center gap-10 text-lg sm:hidden">
              <li
                className={classNames(
                  isSameRoute("/introduce") ? "text-black" : "text-gray-500"
                )}
              >
                <Link href="/introduce">깜지 소개</Link>
              </li>
              <li
                className={classNames(
                  isSameRoute("/challenges") ? "text-black" : "text-gray-500"
                )}
              >
                <Link href="/challenges">깜지 챌린지</Link>
              </li>
            </ul>
          </nav>
          {isUser ? (
            <Link href={`/dashboard`}>
              <button className="text-3xl sm:hidden">
                <Icon icon="bi:person-circle" />
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="py-1 px-4 text-base border-[1px] rounded-3xl bg-black text-white sm:hidden">
                로그인
              </button>
            </Link>
          )}

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
        </div>
      )}
    </>
  );
}

export default Header;
