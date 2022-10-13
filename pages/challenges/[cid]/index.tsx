import { useRouter } from "next/router";
import React from "react";
import ChallengeOverview from "../../../components/challenges/ChallengeOverview";
import styled from "styled-components";
import { media } from "../../../styles/media";
import ChallengeSuccessPeople from "../../../components/challenges/blocks/ChallengeSuccessPeople";
import ChallengeProgressContainer from "../../../components/challenges/containers/ChallengeProgressContainer";
import ChallengeQuizSummaryContainer from "../../../components/challenges/containers/ChallengeQuizSummaryContainer";
import Link from "next/link";

function ChallengePage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);

  return (
    <Background>
      <Frame>
        {challengeId && (
          <>
            <ChallengeOverview challengeId={challengeId} />
            <ChallengeSuccessPeople challengeId={challengeId} />
            <ChallengeProgressContainer challengeId={challengeId} />
            <ChallengeQuizSummaryContainer challengeId={challengeId} />
            <Link href={`/challenges/${challengeId}/write`}>
              <Button type="button">문제 제출하기</Button>
            </Link>
          </>
        )}
      </Frame>
    </Background>
  );
}

export default ChallengePage;

const Background = styled.div`
  background-color: #f8fafc;
`;

const Frame = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;

  padding: 80px 0px;

  width: 1040px;
  margin: 0 auto;

  background-color: #f8fafc;

  ${media.medium`
    width: 100%;
    padding: 88px 12px;
  `}
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 10px;

  position: fixed;
  width: 862px;
  height: 48px;
  bottom: 24px;

  background: #4f46e5;
  box-shadow: 0px 4px 6px rgba(79, 70, 229, 0.2);
  border-radius: 12px;

  font-weight: 600;
  font-size: 16px;
  line-height: 16px;

  color: #ffffff;

  ${media.medium`
    width: 90%;
    height: 48px;
    bottom: 16px;
  `}
`;
