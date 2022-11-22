import React from "react";
import styled from "styled-components";
import { media } from "../../../styles/media";
import {
  Description,
  FirstSpeech,
  SecondSpeech,
  Speechs,
  Title,
} from "../styles";

function QuizExampleContainer() {
  return (
    <Container>
      <Title color="#0F172A">
        우수한 기출 문제를 통해 <Br />
        효과적인 학습이 가능합니다.
      </Title>
      <Description color="#333e4c">
        깜지에서 문제 제출 미션을 달성하면 다른 챌린저들이 작성한 문제들을 풀 수
        있습니다.
      </Description>
      <Speechs>
        <FirstSpeech>
          <img src="image/landing/speech3.png" />
        </FirstSpeech>
        <SecondSpeech>
          <img src="image/landing/speech4.png" />
        </SecondSpeech>
      </Speechs>
      <Images>
        <img src="image/landing/quiz1.png" />
        <img src="image/landing/quiz2.png" />
        <img src="image/landing/quiz3.png" />
        <img src="image/landing/quiz4.png" />
      </Images>
    </Container>
  );
}

export default QuizExampleContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 54px 330px;
  gap: 10px;

  background: #ffffff;

  ${media.medium`
    padding: 54px 20px;
  `}
`;

const Br = styled.br`
  display: none;

  ${media.medium`
    display: block;
  `}
`;

const Images = styled.div`
  display: flex;
  overflow-x: scroll;

  img {
    object-fit: contain;
  }
`;
