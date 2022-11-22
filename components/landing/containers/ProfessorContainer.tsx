import React from "react";
import styled from "styled-components";
import { media } from "../../../styles/media";

function ProfessorContainer() {
  return (
    <Container>
      <Title>
        교수님이 말씀하신 A+의 지름길,
        <br />
        바로 문제 만들기입니다.
      </Title>
      <Description>
        {`"심화 지식을 요구하는 전공 이론 과목의 경우, 직접 문제를 만들며 공부했을 때 더욱 높은 학습 효과를 거둘 수 있습니다."`}
      </Description>
      <Profile>
        <img src="image/landing/professor.png" />
        <span>김민정 교수 (단국대학교 교직교육과)</span>
      </Profile>
    </Container>
  );
}

export default ProfessorContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 54px 470px;
  gap: 10px;

  background: #0f172a;

  ${media.medium`
    padding: 54px 40px;
  `}
`;

const Title = styled.h2`
  font-family: "GongGothicMedium";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 150%;

  text-align: center;

  color: #ffffff;

  ${media.medium`
    font-size: 20px;
  `}
`;

const Description = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;

  text-align: center;

  color: #ffffff;

  opacity: 0.8;

  ${media.medium`
    font-size: 14px;
  `}
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  color: #ffffff;

  img {
    width: 32px;
    height: 32px;
  }
`;
