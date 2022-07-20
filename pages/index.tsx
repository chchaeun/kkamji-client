import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
const Home: NextPage = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("sw.js")
        .then((reg) => {
          console.log(reg);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div>
      <Image src="/image/cat.jpeg" width={100} height={100} alt="테스트" />
    </div>
  );
};

export default Home;
