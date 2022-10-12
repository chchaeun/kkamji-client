import React from "react";
import styled from "styled-components";
import { useQuizDetailQuery } from "../../../api/quizzes/hooks";

interface Props {
  quizId: string;
}

function QuizContentBlock({ quizId }: Props) {
  const { data: quizDetail } = useQuizDetailQuery({ quizId });

  const contentsFormat = (contents: string) => {
    return (
      <p>
        {contents
          .replaceAll("\t", "\u00a0 \u00a0 \u00a0 \u00a0")
          .split("\n")
          .map((content) => (
            <>
              {content}
              <br />
            </>
          ))}
      </p>
    );
  };

  return (
    <Container>
      <Title>문제</Title>
      <ContentBox>
        {quizDetail?.quizContent && contentsFormat(quizDetail?.quizContent)}
        {quizDetail?.quizFiles.map((quizFile) => (
          <img key={quizFile.id} src={quizFile.qfPath} width={500} />
        ))}
      </ContentBox>
    </Container>
  );
}

export default QuizContentBlock;

const Container = styled.div`
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

const ContentBox = styled.p`
  display: block;

  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  color: #111827;
`;
