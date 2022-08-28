import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchChapterDetail } from "../../../../../api/chapters/chapter-detail";
import {
  fetchQuizbookDetail,
  IQuizbookDetail,
} from "../../../../../api/quizbooks/quizbook-detail";
import {
  fetchQuizbooks,
  IQuizbook,
} from "../../../../../api/quizbooks/quizbooks";
import { fetchQuizzes } from "../../../../../api/quizzes/quizzes";
import SideNav from "../../../../../components/layout/side-nav";
import { Chapter } from "../../../../../types/Chapter";
import { QuizSummary } from "../../../../../types/Quiz";
interface INavElements {
  link: string;
  name: string;
  isReadable?: boolean;
}
function QuizbookDetailPage() {
  const router = useRouter();

  const chapterId = String(router.query.cid);
  const quizbookId = String(router.query.qbid);

  const [navTitle, setNavTitle] = useState<INavElements>();
  const [navElements, setNavElements] = useState<INavElements[]>();

  const { data: chapterDetail } = useQuery<Chapter>(
    ["chapterDetail", chapterId],
    () => fetchChapterDetail({ chapterId }),
    {
      enabled: !!router.query.cid,
      onSuccess: (chapterDetail) => {
        setNavTitle({
          name: chapterDetail.chapterName,
          link: `/chapters/${chapterId}`,
        });
      },
    }
  );

  const { data: quizbooks } = useQuery<IQuizbook[]>(
    ["quizbooks", chapterId],
    () => fetchQuizbooks({ chapterId }),
    {
      enabled: !!router.query.cid,
      onSuccess: (quizbooks) => {
        const tempElements = quizbooks.map((quizbook) => {
          return {
            name: quizbook.quizbookTitle,
            link: `/chapters/${chapterId}/quizbooks/${quizbook.quizbookId}`,
            isReadable: true,
          };
        });
        setNavElements(tempElements);
      },
    }
  );

  const { data: quizbookDetail, error } = useQuery<IQuizbookDetail, AxiosError>(
    ["quizbookDetail", quizbookId],
    () => fetchQuizbookDetail({ chapterId, quizbookId }),
    {
      enabled: !!router.query.qbid,
    }
  );

  const { data: quizzes } = useQuery<QuizSummary[]>(
    ["quizzes", chapterId, quizbookId],
    () => fetchQuizzes({ chapterId, quizbookId }),
    {
      enabled: !!(router.query.cid && router.query.qbid),
    }
  );

  const onQuizClick = (quizId: string) => {
    router.push(`/chapters/${chapterId}/quizbooks/${quizbookId}/${quizId}`);
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
    <div className="grid grid-cols-5 gap-4 w-full lg:mt-10 m-auto sm:flex sm:flex-col sm:px-10">
      <div className="col-start-1 flex justify-center mt-10 sm:mt-0">
        {navTitle && navElements && (
          <SideNav props={{ navTitle, navElements }} />
        )}
      </div>
      <div className="col-start-2 col-span-3 pb-10 sm:py-10">
        <div className="flex flex-col gap-2 py-10">
          <h1 className="text-2xl">{quizbookDetail?.quizbookTitle}</h1>
          <p className="text-gray-700">{quizbookDetail?.quizbookDescription}</p>
        </div>
        <div className="flex flex-col gap-3">
          {quizzes?.map((quiz, index) => (
            <div
              key={quiz.quizId}
              onClick={() => onQuizClick(String(quiz.quizId))}
              className="flex items-center gap-5 justify-between bg-white p-5 drop-shadow-md hover:drop-shadow-lg cursor-pointer"
            >
              <div className="flex gap-4">
                <span className="font-semibold">{index + 1}</span>
                {quiz.quizTitle}
              </div>
              {quiz.isSolved && (
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
