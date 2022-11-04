import React from "react";
import styled from "styled-components";
import { useMyQuizDetailQuery } from "../../../api/quizzes/hooks";
import ContentsFormat from "../../../utils/ContentsFormat";

interface Props {
  quizId: string;
}

function MyQuizContentBlock({ quizId }: Props) {
  const { data: quizDetail } = useMyQuizDetailQuery({ quizId });

  return (
    <Container>
      <Title>문제</Title>
      <ContentBox>
        {quizDetail?.quizContent && (
          <ContentsFormat contents={quizDetail.quizContent} />
        )}
        <br />
        {quizDetail?.quizFiles.map((quizFile) => (
          <img key={quizFile.id} src={quizFile.qfPath} width={720} />
        ))}
      </ContentBox>
    </Container>
  );
}

export default MyQuizContentBlock;

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
