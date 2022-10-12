import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { useQuizDetailQuery } from "../../../api/quizzes/hooks";
import ContentsFormat from "../../../utils/ContentsFormat";
import QuizRubric from "./QuizRubric";
interface Props {
  challengeId: string;
  quizId: string;
}

function QuizAnswerBlock({ challengeId, quizId }: Props) {
  const { data: quizDetail } = useQuizDetailQuery({ quizId });

  const [showAnswer, setShowAnswer] = useState(false);

  const onAnswerClick = () => {
    if (quizDetail?.solveAnswer) {
      setShowAnswer((prev) => !prev);
    } else {
      alert("정답을 제출해야 열람할 수 있습니다.");
    }
  };

  return (
    <Container>
      {!showAnswer && <Title>정답 확인</Title>}
      {quizDetail && showAnswer && (
        <>
          <Block>
            <Title>정답 확인</Title>
            <ContentBox>
              <ContentsFormat contents={quizDetail.quizContent} />
            </ContentBox>
          </Block>
          <Block>
            <Title>해설</Title>
            <ContentBox>
              <ContentsFormat contents={quizDetail.quizExplanation || ""} />
            </ContentBox>
          </Block>
          <QuizRubric quizId={quizId} />
        </>
      )}

      <LongButton type="button" onClick={onAnswerClick}>
        {showAnswer ? (
          <>
            <span>닫기</span>
            <Icon icon="zondicons:cheveron-up" />
          </>
        ) : (
          <>
            <span>정답 보기</span>
            <Icon icon="zondicons:cheveron-down" />
          </>
        )}
      </LongButton>
    </Container>
  );
}

export default QuizAnswerBlock;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 100%;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Title = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #111827;
`;

const ContentBox = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  gap: 10px;

  width: 100%;
  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const LongButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 6px;

  width: 100%;

  background: #f3f4f6;
  border-radius: 8px;

  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  color: #4b5563;

  &:hover {
    background: #e5e7eb;
  }
`;
