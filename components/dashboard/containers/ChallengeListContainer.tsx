import React, { Suspense } from "react";
import styled from "styled-components";
import { media } from "../../../styles/Media";
import { Challenge } from "../../../types/Challenge";
import dynamic from "next/dynamic";
import ChallengeListSkeleton from "../../skeletons/ChallengeListSkeleton";

const ChallengeListElement = dynamic(
  () => import("../blocks/ChallengeListElement"),
  {
    suspense: true,
    ssr: false,
  }
);

interface Props {
  challenges: Challenge[];
}

function ChallengeListContainer({ challenges }: Props) {
  return (
    <Container>
      {challenges?.map((challenge) => (
        <>
          {challenge.applicationStatus === "ACCEPTED" && (
            <Suspense fallback={<ChallengeListSkeleton />}>
              <ChallengeListElement
                key={challenge.challengeId}
                challengeId={String(challenge.challengeId)}
              />
            </Suspense>
          )}
        </>
      ))}
    </Container>
  );
}

export default ChallengeListContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  width: 100%;

  ${media.medium`
    display: flex;
    flex-direction: column;
    gap: 35px;
  `}
`;
