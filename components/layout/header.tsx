import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { showNavState } from "../../stores/header";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchChapters, IChapter } from "../../api/chapters/chapters";
import axios from "axios";
function Header() {
  const router = useRouter();
  const [showNav, setShowNav] = useRecoilState(showNavState);

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
  return (
    <>
      {router.pathname !== "/login" && (
        <nav className="flex bg-white fixed w-screen top-0 left-0 z-50 justify-between items-center border-b-2 border-gray-100 font-summer text-3xl p-3">
          <Link href={`/chapters/${currentChapter?.currentChapterId}`}>
            깜지.
          </Link>
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
