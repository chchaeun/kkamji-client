import React from "react";
import styled from "styled-components";
import { media } from "../../../styles/media";
function TitleContainer() {
  return (
    <Container>
      <div>
        <SubTitle>
          종강까지 책임지는
          <br />
          찐한 학점 관리
        </SubTitle>
        <Logo>깜지.</Logo>
      </div>
      <ImageBlock>
        <img src={"image/landing/screen.png"} />
      </ImageBlock>
    </Container>
  );
}

export default TitleContainer;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  width: 100%;
  height: 440px;

  background: #6366f1;

  ${media.medium`
    flex-direction: column;
    height: fit-content;
    padding-top: 40px;
  `}
`;

const SubTitle = styled.h2`
  font-family: "GongGothicMedium";
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 150%;

  color: #ffffff;

  ${media.medium`
    font-size: 24px;
    text-align: center;
  `}
`;

const Logo = styled.h1`
  font-family: "HSSummer";
  font-style: normal;
  font-weight: 700;
  font-size: 80px;
  line-height: 150%;

  color: #ffffff;

  ${media.medium`
    font-size: 48px;
    text-align: center;
  `}
`;

const ImageBlock = styled.div`
  display: flex;
  align-items: flex-end;
  width: 460px;
  height: 100%;

  ${media.medium`
      width: 260px;
  `}
`;
