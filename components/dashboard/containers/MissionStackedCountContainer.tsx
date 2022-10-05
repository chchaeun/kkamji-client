import React, { Suspense } from "react";

import styled from "styled-components";
import { media } from "../../../styles/media";
import MissionStackedCountChart from "../blocks/MissionStackedCountChart";
import ThreeDotsSkeleton from "../../skeletons/ThreeDotsSkeleton";
import DeferredComponent from "../../skeletons/DeferredComponent";

function MissionStackedCountContainer() {
  return (
    <Container>
      <Title>내 문제 제출 현황</Title>
      <Suspense
        fallback={
          <DeferredComponent>
            <ThreeDotsSkeleton />
          </DeferredComponent>
        }
      >
        <MissionStackedCountChart />
      </Suspense>
    </Container>
  );
}

export default MissionStackedCountContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  width: 100%;
  height: 275px;
  padding: 20px 24px 80px;

  background: rgb(249, 250, 251);
  border-radius: 8px;

  ${media.medium`
    height: 234px;
  `}
`;

const Title = styled.h2`
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  color: #111827;
`;
