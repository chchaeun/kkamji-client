import type { NextPage } from "next";
import { useEffect } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { fetchQuizbooks, IQuizbook } from "../api/quiz/quizbooks";
import SideNav from "../components/layout/side-nav";
import Quizbook from "../components/quiz/quizbook";
import { getCode } from "../api/session-code";

const navTitle = { name: "주차 문제집 모음", link: "" };
const navElements = [
  {
    name: "3주차",
    link: "/?week=3",
  },
  {
    name: "4주차",
    link: "/?week=4",
  },
];
const Home: NextPage = () => {
  const router = useRouter();
  const week = String(router.query.week);

  const { data: quizbooks, error } = useQuery<IQuizbook[], AxiosError>(
    ["quizbooks", week],
    () => fetchQuizbooks(week),
    {
      enabled: !!router.query.week && !!getCode(),
      onError: (err) => {
        console.log(err);
      },
    }
  );

  if (error) {
    if (error?.response?.status === 404) {
      return (
        <div className="flex w-full h-screen items-center justify-center">
          존재하지 않는 페이지입니다.
        </div>
      );
    }
  }

  const onQuizBookClick = (quizbook: IQuizbook) => {
    router.push(`/quizbooks/${quizbook.quizbookId}`);
  };

  return (
    <div className="grid grid-cols-5 gap-4 w-full lg:mt-20 m-auto sm:flex sm:flex-col">
      <div className="col-start-1 flex flex-col items-center mt-10 sm:mt-0">
        <SideNav title={navTitle} elements={navElements} />
      </div>
      <div className="col-start-2 col-span-3 flex flex-col gap-10 sm:gap-7 sm:w-4/5 h-screen bg-white py-10 px-20 sm:m-auto sm:px-0 sm:py-20">
        <h1 className="text-2xl">{week}주차 문제집</h1>
        <div className="grid grid-cols-2 gap-8 sm:flex sm:flex-col sm:pb-10">
          {quizbooks?.map((quizbook) => (
            <Quizbook
              key={quizbook.quizbookId}
              props={quizbook}
              onClick={() => onQuizBookClick(quizbook)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
