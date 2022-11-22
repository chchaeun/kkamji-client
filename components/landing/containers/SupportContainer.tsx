import React from "react";
import styled from "styled-components";
import { media } from "../../../styles/media";
import { Br, Description, Title } from "../styles";

function SupportContainer() {
  return (
    <Container>
      <Title color="#ffffff">
        끝까지 공부할 수 있도록 <Br />
        찐한 서포트를 제공합니다.
      </Title>
      <Description color="#ffffff">{`'조금만 더 일찍 공부 시작할 걸...'`}</Description>
      <Block>
        시험 기간이 다가오면 미리 공부하지 못한 것에 대한 아쉬움이 남기
        마련입니다. <br />
        이런 여러분들이 후회하지 않도록, 서포터즈가 직접 여러분들에게
        찾아갑니다! <br />
        <br />
        챌린지 미션 달성이 안되었을 때 서포터즈가 <Br /> 🤙
        <span>직접 전화를 걸어</span>
        <Br /> 여러분들이 챌린지를 끝까지 완수할 수 있도록 찐하게 관리합니다.
      </Block>
      <Extra>
        깜지 서포터즈 서비스는 의무가 아닌 신청 서비스입니다. 추후 챌린지
        진행자들에게 신청 여부에 대해 연락을 드릴 예정입니다.
      </Extra>
    </Container>
  );
}

export default SupportContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 54px 316px;
  gap: 10px;

  background: #0f172a;

  ${media.medium`
    padding: 54px 20px;
  `}
`;

const Block = styled.div`
  margin: 14px 0px;
  padding: 32px;

  background: #ffffff;
  border-radius: 12px;

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;

  text-align: center;

  color: #0f172a;

  span {
    text-decoration: underline;
  }
`;

const Extra = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #ffffff;

  opacity: 0.6;
`;
