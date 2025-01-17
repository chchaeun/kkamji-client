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

function ChallengeContainer() {
  return (
    <Container>
      <Title color="#0F172A">
        깜지에서는 매주 문제를 만들어
        <br />
        제출하는 챌린지를 진행합니다.
      </Title>
      <Description color="#333e4c">
        직접 문제와 해설을 만들어 보면서 자신이 출제한 <br />
        문제의 개념을 확실하게 학습할 수 있습니다.
      </Description>
      <Speechs>
        <FirstSpeech>
          <img src="image/landing/speech1.png" />
        </FirstSpeech>
        <SecondSpeech>
          <img src="image/landing/speech2.png" />
        </SecondSpeech>
      </Speechs>
      <Blocks>
        <Block>
          <span>총 제출 문제 수</span>
          <span>520+</span>
        </Block>
        <Block>
          <span>서비스 평균 만족도</span>
          <span>4.75 ★</span>
        </Block>
        <Block>
          <span>보유 우수 학습 자료</span>
          <span>50+</span>
        </Block>
      </Blocks>
      <Extra>
        문제 제출 양은 깜지 OT에서 안내될 예정이며, 챌린지 진행 중 피드백에 따라
        문제 제출 양이 변동될 수 있습니다.
      </Extra>
    </Container>
  );
}

export default ChallengeContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 54px 330px;
  gap: 10px;

  background: #f8fafc;

  ${media.medium`
    padding: 54px 20px;
  `}
`;

const Blocks = styled.div`
  display: flex;
  gap: 15px;

  margin-bottom: 15px;

  ${media.medium`
    flex-direction: column;
    gap: 8px;
   `}
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 26px 50px;
  gap: 8px;

  width: 246px;
  height: 121px;

  background: #ffffff;
  border-radius: 12px;

  ${media.medium`
    align-items: center;

    width: 100%;
    height: fit-content;
  `}

  span:first-child {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;

    color: #64748b;

    ${media.medium`
        font-size: 12px;
        line-height: 14px;
    `}
  }

  span:last-child {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;

    color: #334155;

    ${media.medium`
        font-size: 24px;
        line-height: 29px;
    `}
  }
`;

const Extra = styled.div`
  text-align: center;

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #64748b;
`;
