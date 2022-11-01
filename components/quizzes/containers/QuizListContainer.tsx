import React, { useEffect, useState } from "react";
import { useQuizzesQuery } from "../../../api/quizzes/hooks";
import { useRecoilValue } from "recoil";
import { weekSelectState } from "../stores/weekFilter";
import styled from "styled-components";
import { QuizSummary } from "../../../types/Quiz";
import QuizListLarge from "../blocks/QuizListLarge";
import { debounce } from "lodash";
import QuizListMedium from "../blocks/QuizListMedium";

interface Props {
  challengeId: string;
  week?: string;
  page: "READABLE" | "MY" | "LIKED";
}

function QuizListContainer({ challengeId, week, page }: Props) {
  const selected = useRecoilValue<boolean[]>(weekSelectState);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizSummary[]>();

  const [windowWidth, setWindowWidth] = useState<number>();

  const { data: quizzes } = useQuizzesQuery({
    challengeId,
    page,
    week,
    suspense: true,
  });

  useEffect(() => {
    if (quizzes) {
      const filtered = quizzes.filter((value) => selected[value.quizWeek - 1]);
      setFilteredQuizzes(filtered);
    }
  }, [quizzes, selected]);

  const onResize = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 500);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  console.log(windowWidth);
  const quizListTitle = () => {
    switch (page) {
      case "MY":
        return "제출한 문제";
      case "LIKED":
        return "좋아요한 문제";
      case "READABLE":
        return "전체 문제";
    }
  };

  return (
    <Container>
      <Title>{quizListTitle()}</Title>
      {filteredQuizzes && filteredQuizzes.length > 0 ? (
        <>
          {windowWidth && windowWidth > 1039 ? (
            <QuizListLarge
              quizzes={filteredQuizzes}
              page={page}
              challengeId={challengeId}
            />
          ) : (
            <QuizListMedium
              quizzes={filteredQuizzes}
              page={page}
              challengeId={challengeId}
            />
          )}
        </>
      ) : (
        <div>문제가 없습니다.</div>
      )}
    </Container>
  );
}

export default QuizListContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #111827;
`;
