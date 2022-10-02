import React, { Suspense } from "react";
import styled from "styled-components";
import { media } from "../../styles/Media";
import dynamic from "next/dynamic";
import ChallengeListSkeleton from "../../components/skeletons/ChallengeListSkeleton";
import DeferredComponent from "../../components/skeletons/DeferredComponent";
import MissionSteppedLineChart from "../../components/dashboard/blocks/MissionSteppedLineChart";
const ChallengeList = dynamic(
  async () => await import("../../components/dashboard/blocks/ChallengeList"),
  {
    suspense: true,
    ssr: false,
  }
);

function Dashboard() {
  return (
    <Frame>
      <Title>나의 챌린지 현황</Title>
      <HighlightBar>
        📢 벼락치기를 하는 50%의 대학생들을 앞서고 있습니다! 조금만 더 화이팅!
      </HighlightBar>
      <MissionSteppedLineChart />
      <Suspense
        fallback={
          <DeferredComponent>
            <ChallengeListSkeleton />
          </DeferredComponent>
        }
      >
        <ChallengeList />
      </Suspense>
    </Frame>
  );
}

export default Dashboard;

const Frame = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;

  padding: 80px 240px;

  ${media.medium`
    padding: 88px 20px;
    gap: 20px;
  `}
`;
const Title = styled.h1`
  display: flex;
  align-items: flex-start;

  width: 100%;

  font-weight: 700;
  font-size: 24px;
  line-height: 29px;

  color: #111827;
`;

const HighlightBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;

  width: 100%;

  background: #000000;
  border-radius: 8px;

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  text-align: center;

  color: #ffffff;

  ${media.medium`
    line-height: 21px;
    text-align: start;
  `}
`;
