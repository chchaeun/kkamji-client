import { Icon } from "@iconify/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  fetchQuizbookDetail,
  IQuizbookDetail,
} from "../../../api/quiz/quizbook-detail";
import SideNav from "../../../components/layout/side-nav";
interface INavElements {
  link: string;
  name: string;
}
const navTitle3 = { name: "3주차 문제집 모음", link: "/?week=3" };
const navElements3 = [
  {
    name: "3주차 문제집 A",
    link: "/quizbooks/13",
  },
  {
    name: "3주차 문제집 B",
    link: "/quizbooks/14",
  },
  {
    name: "3주차 문제집 C",
    link: "/quizbooks/15",
  },
  {
    name: "3주차 문제집 D",
    link: "/quizbooks/16",
  },
];
const navTitle4 = { name: "4주차 문제집 모음", link: "/?week=4" };
const navElements4 = [
  {
    name: "4주차 문제집 A",
    link: "/quizbooks/17",
  },
  {
    name: "4주차 문제집 B",
    link: "/quizbooks/18",
  },
  {
    name: "4주차 문제집 C",
    link: "/quizbooks/19",
  },
  {
    name: "4주차 문제집 D",
    link: "/quizbooks/20",
  },
];
// interface IParams {
//   params: {
//     qbid: number;
//   };
// }
// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: { qbid: 1 },
//       },
//     ],
//   };
// }

// export async function getStaticProps({ params }: IParams) {
//   return { props: {} };
// }

function QuizbookDetailPage() {
  const router = useRouter();

  const [quizbookId, setQuizbookId] = useState(String(router.query.qbid));

  const [navTitle, setNavTitle] = useState<INavElements>();
  const [navElements, setNavElements] = useState<INavElements[]>();

  const { data: quizbookDetail, error } = useQuery<IQuizbookDetail, AxiosError>(
    ["quizbookDetail", quizbookId],
    () => fetchQuizbookDetail(quizbookId),
    {
      enabled: !!quizbookId,
    }
  );

  useEffect(() => {
    setQuizbookId(String(router.query.qbid));
  }, [router]);

  useEffect(() => {
    if (quizbookDetail?.quizbookWeek === 3) {
      setNavTitle(navTitle3);
      setNavElements(navElements3);
    } else if (quizbookDetail?.quizbookWeek === 4) {
      setNavTitle(navTitle4);
      setNavElements(navElements4);
    }
  }, [quizbookDetail]);

  const onQuizClick = (quizId: string) => {
    router.push(`/quizbooks/${quizbookId}/${quizId}`);
  };

  if (error) {
    if (error?.response?.status === 404) {
      return (
        <div className="flex w-full h-screen items-center justify-center">
          존재하지 않는 페이지입니다.
        </div>
      );
    }
  }
  return (
    <div className="grid grid-cols-5 gap-4 w-full lg:mt-20 m-auto sm:flex sm:flex-col sm:px-10">
      <div className="col-start-1 flex justify-center mt-10 sm:mt-0">
        {navTitle && navElements && (
          <SideNav title={navTitle} elements={navElements} />
        )}
      </div>
      <div className="col-start-2 col-span-3 pb-10 sm:py-10">
        <div className="flex flex-col gap-2 py-10">
          <h1 className="text-2xl">{quizbookDetail?.quizbookTitle}</h1>
          <p className="text-gray-700">{quizbookDetail?.quizbookDescription}</p>
        </div>
        <div className="flex flex-col gap-3">
          {quizbookDetail?.quizSummaries.map((quiz, index) => (
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

export default QuizbookDetailPage;
