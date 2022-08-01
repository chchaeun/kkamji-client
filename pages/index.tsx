import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Quizbook from "../components/quiz/quizbook";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizbooks, IQuizbook } from "../api/quiz/quizbooks";
import { fetchUserInfo, IUserInfo } from "../api/user/user-info";
import {
  fetchSubmitPeriods,
  ISubmitPeriod,
} from "../api/submit/submit-periods";
import Overlay from "../components/layout/overlay";
import QuizbookPurchaseModal from "../components/quiz/quizbook-purchase-modal";
import { classNames } from "../styles/classname-maker";
import SubmitPeriods from "../components/submit/submit-periods";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/quizbooks?week=1");
  }, [router]);

  return <div></div>;
};

export default Home;
