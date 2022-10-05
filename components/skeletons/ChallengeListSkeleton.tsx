import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import { media } from "../../styles/media";
function ChallengeListSkeleton() {
  return (
    <Container>
      <Block>
        <Skeleton className="img-box" />
        <Skeleton count={2} className="info-box" />
      </Block>
      <Block>
        <Skeleton className="img-box" />
        <Skeleton count={2} className="info-box" />
      </Block>
      <Block>
        <Skeleton className="img-box" />
        <Skeleton count={2} className="info-box" />
      </Block>
    </Container>
  );
}

export default ChallengeListSkeleton;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  width: 100%;

  ${media.medium`
    flex-direction: column;    
    gap: 0px;
  `}
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;

  ${media.medium`
    gap: 2px;
  `}

  .img-box {
    display: block;
    width: 100%;
    height: 180px;

    ${media.medium`
      display: none;
    `}
  }

  .info-box {
    display: block;
    width: 100%;

    ${media.medium`
    `}
  }
`;
