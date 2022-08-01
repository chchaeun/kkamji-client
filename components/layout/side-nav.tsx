import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import { showNavState } from "../../stores/header";
import { classNames } from "../../styles/classname-maker";
interface INavProps {
  title: string;
  elements: { name: string; link: string }[];
}
function SideNav(props: INavProps) {
  const router = useRouter();
  const { title, elements } = props;

  const showNav = useRecoilValue(showNavState);

  return (
    <nav
      className={classNames(
        showNav
          ? "sm:fixed sm:w-full sm:py-10 sm:px-10 sm:bg-white sm:bg-opacity-95 sm:z-10"
          : "flex flex-col gap-3 px-10 py-5 h-fit sm:hidden"
      )}
    >
      <h3 className="text-xl">{title}</h3>
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
    </nav>
  );
}

export default SideNav;
