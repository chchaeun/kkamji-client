import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { classNames } from "../../styles/classname-maker";
interface INavProps {
  title: string;
  elements: { name: string; link: string }[];
}
function SideNav(props: INavProps) {
  const router = useRouter();
  const { title, elements } = props;

  console.log(window.location);

  return (
    <nav className="flex flex-col gap-3 px-10 py-5 h-fit ">
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
