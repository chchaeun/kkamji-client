import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
function Header() {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/login" && (
        <nav className="flex bg-white sticky top-0 left-0 z-50 justify-between items-center border-b-2 border-gray-100 font-summer text-3xl p-3">
          <Link href="/">깜지.</Link>
        </nav>
      )}
    </>
  );
}

export default Header;
