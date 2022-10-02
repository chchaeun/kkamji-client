import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import { media } from "../../styles/Media";
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

  ${media.medium`
    flex-direction: column;    
  `}
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${media.medium`
    flex-direction: row-reverse;
    justify-content: center;
    
    width: 90vw;
  `}

  .img-box {
    width: 20vw;
    height: 180px;

    ${media.medium`
        width: 15vw;
        height: 15vw;
    `}
  }

  .info-box {
    width: 20vw;
    ${media.medium`
        width: 70vw;
        height: 7vw;
    `}
  }
`;
