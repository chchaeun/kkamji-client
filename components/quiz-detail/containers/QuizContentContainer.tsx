import React from "react";
import styled from "styled-components";
import QuizContentBlock from "../blocks/QuizContentBlock";
import QuizPointBlock from "../blocks/QuizPointBlock";
import QuizSolveBlock from "../blocks/QuizSolveBlock";
import QuizAnswerBlock from "../blocks/QuizAnswerBlock";
import QuizTitleBlock from "../blocks/QuizTitleBlock";
import { media } from "../../../styles/media";

interface Props {
  challengeId: string;
  quizId: string;
}
function QuizContentContainer({ challengeId, quizId }: Props) {
  return (
    <Container>
      <ColDiv>
        <QuizPointBlock />
        <QuizTitleBlock challengeId={challengeId} quizId={quizId} />
      </ColDiv>
      <Horizontal />
      <QuizContentBlock quizId={quizId} />
      <QuizSolveBlock quizId={quizId} />
      <DashedHorizontal />
      <QuizAnswerBlock quizId={quizId} challengeId={challengeId} />
    </Container>
  );
}

export default QuizContentContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 36px;
  gap: 32px;

  width: 100%;

  background: #ffffff;

  border: 1px solid #f3f4f6;
  border-radius: 8px;

  ${media.medium`
    padding: 24px 16px;
  `}
`;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
`;

const Horizontal = styled.hr`
  width: 100%;
  height: 0px;
  border: 0.5px solid #e5e7eb;
`;

const DashedHorizontal = styled(Horizontal)`
  border: 0.5px dashed #e5e7eb;
`;
