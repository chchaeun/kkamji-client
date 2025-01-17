import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useQuizzesQuery } from "../../../api/quizzes/hooks";

interface Props {
  title: string;
  page: "READABLE" | "MY" | "LIKED";
  challengeId: string;
}
function ChallengeQuizSummary({ title, page, challengeId }: Props) {
  const { data: quizzes } = useQuizzesQuery({ challengeId, page });

  const getLinkByPage = (quizId?: number) => {
    const BASE_LINK = `/challenges/${challengeId}/quizzes`;
    switch (page) {
      case "READABLE":
        return BASE_LINK + `${quizId ? `/${quizId}` : ""}`;
      case "MY":
        return BASE_LINK + `${quizId ? `/${quizId}` : ""}/my`;
      case "LIKED":
        return BASE_LINK + `${quizId ? `/${quizId}` : ""}/like`;
    }
  };

  const getDateFormatted = (createdDate: string) => {
    const date_object = new Date(createdDate);
    const month = date_object.toLocaleString("en-US", { month: "short" });
    const date = date_object.getDate();
    const year = date_object.getFullYear();
    const hours = date_object.getHours();
    const minutes = date_object.getMinutes();
    return `${month} ${date}, ${year} ${hours}:${minutes}`;
  };

  return (
    <Container>
      <Title> {title}</Title>
      <ul>
        {quizzes?.slice(0, 5).map((quiz) => (
          <Link href={getLinkByPage(quiz.quizId)} key={quiz.quizId}>
            <Li>
              <a>{quiz.quizTitle}</a>
              <div>
                <span>{quiz.writerName}</span>
                <span>{getDateFormatted(quiz.quizCreatedDate)}</span>
              </div>
            </Li>
          </Link>
        ))}
      </ul>
      <Link href={getLinkByPage()}>
        <Button type="button">더보기</Button>
      </Link>
    </Container>
  );
}

export default ChallengeQuizSummary;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px 24px;

  height: 530px;

  background: #ffffff;

  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`;

const Title = styled.h2`
  position: relative;

  width: 100%;

  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #111827;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 0px;
  gap: 8px;

  width: 100%;
  height: 79px;

  border-top: 1px solid #f4f4f5;

  cursor: pointer;

  a {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;

    color: #111827;

    &:hover {
      text-decoration: underline;
    }
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 12px;

    span {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      &:first-child {
        color: #374151;
      }
      &:last-child {
        color: #9ca3af;
      }
    }
  }
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 10px;

  width: 100%;
  height: 36px;

  background: #f3f4f6;
  border-radius: 8px;

  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  color: #4b5563;

  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;
