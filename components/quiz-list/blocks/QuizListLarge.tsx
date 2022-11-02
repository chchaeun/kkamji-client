import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { QuizSummary } from "../../../types/Quiz";
import { currentPageState } from "../stores/currentPage";
import QuizListPagination from "./QuizListPagination";

interface Props {
  challengeId: string;
  page: "READABLE" | "LIKED" | "MY";
  quizzes: QuizSummary[];
}

function QuizListLarge({ challengeId, page, quizzes }: Props) {
  const router = useRouter();
  const currentPage = useRecoilValue(currentPageState);

  // page에 따라 퀴즈 상세페이지로 이동하는 href를 설정해주는 함수이다.
  const getLinkByPage = (quizId: number) => {
    const LINK_HEAD = `/challenges/${challengeId}/quizzes/${quizId}`;
    switch (page) {
      case "MY":
        return `${LINK_HEAD}/my`;
      case "LIKED":
        return `${LINK_HEAD}/like`;
      case "READABLE":
        return `${LINK_HEAD}`;
    }
  };

  const onQuizClick = (quizId: number) => {
    router.push(getLinkByPage(quizId));
  };

  return (
    <>
      <table>
        <thead>
          <Tr>
            <Th>번호</Th>
            <Th widthPixel={516} textAlign={"left"}>
              제목
            </Th>
            <Th>작성자</Th>
            <Th>문제 풀린 횟수</Th>
            <Th>주차</Th>
            <Th>좋아요</Th>
            <Th>해결</Th>
          </Tr>
        </thead>
        <tbody>
          {quizzes
            ?.slice(currentPage * 10, currentPage * 10 + 10)
            ?.map((quiz) => (
              <Tr key={quiz.quizId} onClick={() => onQuizClick(quiz.quizId)}>
                <Td>{quiz.quizId}</Td>
                <Td textAlign={"left"}>{quiz.quizTitle}</Td>
                <Td>{quiz.writerName}</Td>
                <Td>{quiz.cntOfSolved}회</Td>
                <Td>{quiz.quizWeek}주</Td>
                <Td>
                  <IconSpan>
                    <Icon icon="icon-park-solid:good-two" color={"#6B7280"} />
                    <span>{quiz.cntOfGood ? quiz.cntOfGood : 0}</span>
                  </IconSpan>
                </Td>
                {quiz.isSolved ? (
                  <Td>
                    <Icon
                      icon="heroicons-solid:badge-check"
                      height={22}
                      style={{ display: "inline", color: "#6366f1" }}
                    />
                  </Td>
                ) : (
                  <Td>
                    <Icon
                      icon="heroicons-solid:badge-check"
                      height={22}
                      style={{ display: "inline", color: "#E5E7EB" }}
                    />
                  </Td>
                )}
              </Tr>
            ))}
        </tbody>
      </table>
      <QuizListPagination quizListLength={quizzes.length} />
    </>
  );
}

export default QuizListLarge;

const Tr = styled.tr`
  &:hover > td {
    background: #f9fafb;
  }
`;

const Th = styled.th<{ widthPixel?: number; textAlign?: string }>`
  background: #f3f4f6;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.05);

  width: ${(p) => `${p.widthPixel}px`};

  padding: 12px 16px;

  text-align: ${(p) => (p.textAlign === "left" ? "left" : "center")};
  font-weight: 600;
  font-size: 14px;
  line-height: 115%;

  color: #111827;
`;

const Td = styled.td<{ textAlign?: string }>`
  background: #ffffff;
  text-align: ${(p) => (p.textAlign === "left" ? "left" : "center")};
  padding: 16px;

  font-size: 14px;

  cursor: pointer;
`;

const IconSpan = styled.span`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
`;
