import React from "react";
import "react-notion/src/styles.css";
import styled from "styled-components";
import HeadTitle from "../components/common/HeadTitle";
import HeaderContainer from "../components/write/containers/HeaderContainer";
import WriteContainer from "../components/write/containers/WriteContainer";
import { media } from "../styles/media";

function Manual() {
  const OPENCHAT_LINK = "https://open.kakao.com/o/sKmvifwe";
  return (
    <>
      <HeadTitle name="문제 제출 매뉴얼 : 깜지" />
      <Background>
        <Title>깜지 문제 제출 매뉴얼</Title>
        <Description>
          문제 제출을 어떻게 해야 할지 막막할 때 참고할 수 있는 매뉴얼입니다.
          <br />
          매뉴얼을 보고도 헷갈리는 부분이 있거나, 애매한 부분이 고민되면 언제든
          깜지 서포터즈에게 질문하세요! 😉
          <br />
          교수님이 진행하시는 별도의 퀴즈가 있는 과목의 경우 깜지 서포터즈에게
          요청해주세요.
          <br />
          교수님의 퀴즈 양식에 맞게 문제 제출 방식을 추가할 수 있습니다.
        </Description>
        <Link href={OPENCHAT_LINK} target="_black">
          {"깜지 서포터즈 문의 >"}
        </Link>
        <Frame>
          <HeaderContainer challengeId={"1"} isManual={true} />
          <WriteContainer challengeId={"1"} isManual={true} />
        </Frame>
      </Background>
      <Medium>
        <Title>깜지 문제 제출 매뉴얼</Title>
        <Description>
          문제 제출 매뉴얼은 PC버전에서 확인할 수 있습니다.
        </Description>
        <Link href={OPENCHAT_LINK} target="_black">
          {"깜지 서포터즈 문의 >"}
        </Link>
      </Medium>
    </>
  );
}

export default Manual;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 90px;

  background-color: #f8fafc;

  ${media.medium`
    display: none;
  `}
`;

const Medium = styled.div`
  display: none;

  ${media.medium`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 90px;

    height: 100vh;
    background-color: #f8fafc;
  `}
`;

const Title = styled.div`
  margin: 0 auto;

  font-weight: 700;
  font-size: 32px;
  line-height: 38px;

  color: #111827;
`;

const Description = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;

  text-align: center;

  color: #111827;
`;

const Link = styled.a`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  text-align: center;

  color: #4338ca;

  &:hover {
    text-decoration: underline;
  }
`;

const Frame = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  padding: 24px 0px;

  width: 576px;
  margin: 0 auto;

  background-color: #f8fafc;

  ${media.medium`
    width: 100%;
    padding: 60px 12px;
  `}
`;
