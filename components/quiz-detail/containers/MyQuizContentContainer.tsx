import React from "react";
import styled from "styled-components";
import MyQuizAnswerBlock from "../blocks/MyQuizAnswerBlock";
import MyQuizContentBlock from "../blocks/MyQuizContentBlock";
import QuizPointBlock from "../blocks/QuizPointBlock";
import QuizTitleBlock from "../blocks/QuizTitleBlock";

interface Props {
  challengeId: string;
  quizId: string;
}
function MyQuizContentContainer({ challengeId, quizId }: Props) {
  return (
    <Container>
      <ColDiv>
        <QuizTitleBlock challengeId={challengeId} quizId={quizId} />
      </ColDiv>
      <Horizontal />
      <MyQuizContentBlock quizId={quizId} />
      <DashedHorizontal />
      <MyQuizAnswerBlock quizId={quizId} />
    </Container>
  );
}

export default MyQuizContentContainer;

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
`;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
`;

const Horizontal = styled.hr`
  width: 648px;
  height: 0px;
  border: 0.5px solid #e5e7eb;
`;

const DashedHorizontal = styled(Horizontal)`
  border: 0.5px dashed #e5e7eb;
`;
