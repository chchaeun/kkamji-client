import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  fetchQuizbookDetail,
  IQuizbookDetail,
} from "../../api/quiz/quizbook-detail";
import SideNav from "../../components/layout/side-nav";

const navTitle = "1주차 문제집 모음";
const navElements = [
  {
    name: "문제집 1 제목",
    link: "/quizbooks/1",
  },
  {
    name: "문제집 2 제목",
    link: "/quizbooks/2",
  },
];

function QuizbookDetail() {
  const router = useRouter();

  const quizbookId = String(router.query.qbid);

  const { data: quizbookDetail } = useQuery<IQuizbookDetail>(
    ["quizbookDetail"],
    () => fetchQuizbookDetail(quizbookId),
    {
      enabled: !!router.query.qbid,
    }
  );

  const onQuizClick = (quizID: string) => {
    router.push(`/quizzes/${quizID}`);
  };

  return (
    <div className="grid grid-cols-5 gap-4 w-full m-auto sm:flex sm:flex-col sm:px-10">
      <div className="col-start-1 flex justify-center mt-10 sm:mt-0">
        <SideNav title={navTitle} elements={navElements} />
      </div>
      <div className="col-start-2 col-span-3">
        <div className="flex flex-col gap-2 py-10">
          <h1 className="text-2xl">{quizbookDetail?.quizbookTitle}</h1>
          <p className="text-gray-700">{quizbookDetail?.quizbookDescription}</p>
        </div>
        <div className="flex flex-col gap-3 ">
          {quizbookDetail?.quizzes.map((quiz, index) => (
            <div
              key={quiz.quizId}
              onClick={() => onQuizClick(String(quiz.quizId))}
              className="flex items-center gap-5 justify-between bg-white p-5 drop-shadow-md hover:drop-shadow-lg cursor-pointer"
            >
              <div className="flex gap-4">
                <span className="font-semibold">{index + 1}</span>
                {quiz.quizTitle}
              </div>
              {quiz.quizIsSolved && (
                <Icon icon="bi:patch-check-fill" color="#5c3cde" height={24} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizbookDetail;
