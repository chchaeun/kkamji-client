import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { getCode } from "../../api/session-code";
import { showNavState } from "../../stores/header";
import { classNames } from "../../styles/classname-maker";

interface Navigation {
  name: string;
  link: string;
}

function MobileNav() {
  const router = useRouter();

  const [showNav, setShowNav] = useRecoilState(showNavState);

  const [navigation, setNavigation] = useState<Navigation[]>();

  const { data: currentChapter } = useQuery<{ currentChapterId: number }>(
    ["currentChapter"],
    async () => {
      const { data } = await axios.get(
        "https://a61e9270-0366-4013-a651-fbc3d46384ab.mock.pstmn.io/v1/current-chapter"
      );
      return data;
    },
    {
      onSuccess: (currentChapter) => {
        let newNavigation = [
          {
            name: "깜지 소개",
            link: "/introduce",
          },
          {
            name: "챌린지",
            link: "/challenges",
          },
        ];
        if (getCode()) {
          newNavigation = newNavigation.concat(
            {
              name: "문제 작성",
              link: `/chapters/${currentChapter.currentChapterId}/write`,
            },
            {
              name: "MY",
              link: `/dashboard`,
            }
          );
        }
        setNavigation(newNavigation);
      },
    }
  );

  const handleNavigation = () => {
    setShowNav(false);
  };

  return (
    <nav
      className={classNames(
        showNav
          ? "flex flex-col justify-between fixed top-0 w-full h-full pt-32 pb-10 px-10 bg-white bg-opacity-95 z-10"
          : "hidden"
      )}
    >
      <ul className="flex flex-col gap-5 text-xl" onClick={handleNavigation}>
        {navigation?.map((element, index) => (
          <li
            key={index}
            className={classNames(
              router.pathname === element.link
                ? "font-semibold text-black"
                : "text-gray-500"
            )}
          >
            <Link href={element.link}>{element.name}</Link>
          </li>
        ))}
      </ul>
      {!getCode() && (
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
