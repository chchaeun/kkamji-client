import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
function Header() {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/login" && (
        <nav>
          <Link href="/">깜지</Link>
        </nav>
      )}
    </>
  );
}

export default Header;
