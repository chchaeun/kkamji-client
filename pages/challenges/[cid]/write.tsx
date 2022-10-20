import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import HeaderContainer from "../../../components/write/containers/HeaderContainer";
import WriteContainer from "../../../components/write/containers/WriteContainer";
import { media } from "../../../styles/media";

function QuizWritePage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);

  return (
    <Background>
      <Frame>
        <HeaderContainer challengeId={challengeId} />
        <WriteContainer challengeId={challengeId} />
      </Frame>
    </Background>
  );
}

export default QuizWritePage;

const Background = styled.div`
  background-color: #f8fafc;
`;

const Frame = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  padding: 80px 0px;

  width: 720px;
  margin: 0 auto;

  background-color: #f8fafc;

  ${media.medium`
    width: 100%;
    padding: 60px 12px;
  `}
`;
