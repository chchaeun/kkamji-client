import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { showNavState } from "../../stores/header";
import { classNames } from "../../styles/classname-maker";
interface INavProps {
  title: { name: string; link?: string };
  elements: { name: string; link: string }[];
}
function SideNav(props: INavProps) {
  const router = useRouter();
  const { title, elements } = props;

  const [showNav, setShowNav] = useRecoilState(showNavState);

  useEffect(() => {
    setShowNav(false);
  }, [router.asPath, setShowNav]);

  return (
    <nav
      className={classNames(
        showNav
          ? "sm:fixed sm:w-full sm:h-screen sm:mt-10 sm:py-20 sm:px-10 sm:bg-white sm:bg-opacity-95 sm:z-10"
          : "flex flex-col gap-3 px-10 py-5 h-fit sm:hidden"
      )}
    >
      <h3 className="text-xl">
        {title.link ? <Link href={title.link}>{title.name}</Link> : title.name}
      </h3>
      <ul>
        {elements.map((element, index) => (
          <li
            key={index}
            className={classNames(
              router.asPath === element.link
                ? "font-semibold text-[#5c3cde]"
                : "text-gray-700"
            )}
          >
            <Link href={element.link}>{element.name}</Link>
          </li>
        ))}
      </ul>
      {/* <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSd57wjQ6NtLfeVM-IBfHIgTI3hw-YoCi03TBRFUwGhDK53urw/viewform?usp=sf_link"
        target="_blank"
        rel="noreferrer"
        className="sm:fixed sm:bottom-10 z-10 bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >
        이번주 문제 제출하기
      </a> */}
    </nav>
  );
}

export default SideNav;
