import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { QuizSummary } from "../../../types/Quiz";

interface Props {
  challengeId: string;
  page: "READABLE" | "LIKED" | "MY";
  quizzes: QuizSummary[];
}

function QuizListMedium({ challengeId, page, quizzes }: Props) {
  const offset = 5;

  const ButtonNames = {
    SEEMORE: "더보기",
    CLOSE: "접기",
  };
  Object.freeze(ButtonNames);

  const [pagination, setPagination] = useState(offset);
  const [buttonName, setButtonName] = useState(ButtonNames.SEEMORE);

  const getLinkByPage = (quizId?: number) => {
    const BASE_LINK = `/challenges/${challengeId}/quizzes`;

    switch (page) {
      case "READABLE":
        return BASE_LINK + `${`/${quizId}`}`;
      case "MY":
        return BASE_LINK + `${`/${quizId}`}/my`;
      case "LIKED":
        return BASE_LINK + `${`/${quizId}`}/like`;
    }
  };

  const onButtonClick = () => {
    const quizListLength = quizzes.length;

    if (pagination < quizListLength) {
      setPagination((prevPagination) => prevPagination + offset);
      setButtonName(ButtonNames.SEEMORE);
    } else if (pagination >= quizListLength) {
      setPagination((prevPagination) => prevPagination - offset);
      setButtonName(ButtonNames.CLOSE);
    }
  };

  useEffect(() => {
    const quizListLength = quizzes.length;

    if (pagination < quizListLength) {
      setButtonName(ButtonNames.SEEMORE);
    } else if (pagination >= quizListLength) {
      setButtonName(ButtonNames.CLOSE);
    }
  }, [ButtonNames.CLOSE, ButtonNames.SEEMORE, pagination, quizzes.length]);

  return (
    <Container>
      <ul>
        {quizzes?.slice(0, pagination).map((quiz) => (
          <Link href={getLinkByPage(quiz.quizId)} key={quiz.quizId}>
            <Li>
              <a>{quiz.quizTitle}</a>
              <div>
                <span>{quiz.writerName}</span>
                <span>
                  <IconSpan>
                    <Icon icon="icon-park-solid:good-two" color={"#6B7280"} />
                    <span>{quiz.cntOfGood ? quiz.cntOfGood : 0}</span>
                  </IconSpan>
                </span>
                <span>
                  {quiz.isSolved ? (
                    <Icon
                      icon="heroicons-solid:badge-check"
                      height={16}
                      style={{ display: "inline", color: "#6366f1" }}
                    />
                  ) : (
                    <Icon
                      icon="heroicons-solid:badge-check"
                      height={16}
                      style={{ display: "inline", color: "#E5E7EB" }}
                    />
                  )}
                </span>
              </div>
            </Li>
          </Link>
        ))}
      </ul>
      <Button type="button" onClick={onButtonClick}>
        {buttonName}
      </Button>
    </Container>
  );
}

export default QuizListMedium;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

const IconSpan = styled.span`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
`;
