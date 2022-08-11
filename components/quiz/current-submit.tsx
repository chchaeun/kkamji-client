import React from "react";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { showNavState } from "../../stores/header";
import { classNames } from "../../styles/classname-maker";

function CurrentSubmit({ quizCurrentSubmit }: { quizCurrentSubmit: number }) {
  const [showCurrentSubmit, setShowCurrentSubmit] =
    useRecoilState(showNavState);
  return (
    <div
      className={classNames(
        showCurrentSubmit
          ? "flex flex-col gap-3 fixed w-full h-screen mt-10 py-20 px-10 bg-white bg-opacity-95 z-10"
          : "col-start-1 flex flex-col items-center gap-2 mt-10 sm:mt-0 sm:hidden"
      )}
    >
      <span className="text-lg">이번주 문제 제출 현황</span>
      <span className="grid grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((element, index) => (
          <span key={index}>
            {quizCurrentSubmit && element <= quizCurrentSubmit ? (
              <Icon icon="clarity:pencil-solid" color="#000000" height="30" />
            ) : (
              <Icon icon="clarity:pencil-line" color="#000000" height="30" />
            )}
          </span>
        ))}
      </span>
    </div>
  );
}

export default CurrentSubmit;
