import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useChallengeDetailQuery } from "../../../api/challenges/hooks";
import { useQuizDetailQuery } from "../../../api/quizzes/hooks";
import QuizRate from "./QuizRate";

interface Props {
  challengeId: string;
  quizId: string;
}
function QuizTitleBlock({ challengeId, quizId }: Props) {
  const { data: challenge } = useChallengeDetailQuery({
    challengeId,
  });
  const { data: quizDetail } = useQuizDetailQuery({ quizId });

  return (
    <Container>
      <Title>
        <Link href={`/challenges/${challengeId}`}>
          <a>{challenge?.title} 챌린지</a>
        </Link>
        <h1>{quizDetail?.quizTitle}</h1>
      </Title>
      <SubTitle>
        <span>작성자: {quizDetail?.writerName}</span>
        <span aria-hidden={"true"}>|</span>
        <span>문제 풀린 횟수 940</span>
        <span aria-hidden={"true"}>|</span>
        <QuizRate quizId={quizId} />
      </SubTitle>
    </Container>
  );
}

export default QuizTitleBlock;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;

  width: 100%;

  a {
    font-size: 14px;
    color: #656565;
  }

  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;

    color: #111827;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const SubTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 11px;

  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  color: #0f172a;
`;
