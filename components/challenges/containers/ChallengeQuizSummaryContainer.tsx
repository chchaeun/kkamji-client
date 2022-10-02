import React from "react";
import styled from "styled-components";
import useOpenWeeksQuery from "../../../hooks/open-weeks";
import { media } from "../../../styles/media";
import QuizSummary from "../blocks/ChallengeQuizSummary";
interface Props {
  challengeId: string;
}
function ChallengeQuizSummaryContainer({ challengeId }: Props) {
  const { data: openWeeks } = useOpenWeeksQuery();

  const getReadableWeeks = () => {
    let readable = new Array<string>();
    openWeeks?.weeks.forEach((week) => {
      if (week.status === "READABLE") {
        readable.push(String(week.week));
      }
    });
    return readable.join(",");
  };

  return (
    <Container>
      {openWeeks && (
        <QuizSummary
          challengeId={challengeId}
          title={"열람 가능 문제"}
          page={"READABLE"}
          week={getReadableWeeks()}
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
