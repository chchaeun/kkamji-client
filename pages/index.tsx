import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/quizbooks?week=1");
  }, [router]);

  return <div></div>;
};

export default Home;
