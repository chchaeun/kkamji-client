import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { showNavState } from "../../stores/header";
import { useQueryClient } from "@tanstack/react-query";
import { IChapter } from "../../api/chapters/chapters";
function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const todayDate = new Date();

  const chapters = queryClient.getQueryData<IChapter[]>(["chapters"]);
  const currentChapterId = chapters?.map((chapter) => {
    if (
      new Date(chapter?.chapterStartDate) <= todayDate &&
      new Date(chapter?.chapterEndDate) >= todayDate
    ) {
      return chapter.chapterId;
    }
  });

  const [showNav, setShowNav] = useRecoilState(showNavState);

  const onRankingClick = () => {
    setShowNav((prev) => !prev);
  };
  return (
    <>
      {router.pathname !== "/login" && (
        <nav className="flex bg-white fixed w-screen top-0 left-0 z-50 justify-between items-center border-b-2 border-gray-100 font-summer text-3xl p-3">
          <Link href={`/chapters/${currentChapterId}`}>깜지.</Link>
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
