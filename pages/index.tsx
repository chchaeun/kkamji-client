import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("code")) {
      router.push("/login");
    }
  }, [router]);
  return <div></div>;
};

export default Home;
