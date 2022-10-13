import React from "react";
import styled from "styled-components";
import { useOpenWeeksQuery } from "../../../api/challenges/hooks";
import { media } from "../../../styles/media";
import QuizSummary from "../blocks/ChallengeQuizSummary";
interface Props {
  challengeId: string;
}
function ChallengeQuizSummaryContainer({ challengeId }: Props) {
  const { data: openWeeks } = useOpenWeeksQuery({ challengeId });

  return (
    <Container>
      {openWeeks && (
        <QuizSummary
          challengeId={challengeId}
          title={"전체 문제"}
          page={"READABLE"}
        ></QuizSummary>
      )}
      <QuizSummary
        challengeId={challengeId}
        title={"제출한 문제"}
        page={"MY"}
      ></QuizSummary>
      <QuizSummary
        challengeId={challengeId}
        title={"좋아요한 문제"}
        page={"LIKED"}
      ></QuizSummary>
    </Container>
  );
}

export default ChallengeQuizSummaryContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding: 0px;

  width: 100%;
  height: 530px;

  ${media.medium`
    display:flex;
    flex-direction: column;
    height: 1590px;
  `}
`;
