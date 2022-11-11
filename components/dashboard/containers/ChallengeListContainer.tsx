import React from "react";
import styled from "styled-components";
import { media } from "../../../styles/media";
import ChallengeListElement from "../blocks/ChallengeListElement";
import { useMyChallengeQuery } from "../../../api/challenges/hooks";

function ChallengeListContainer() {
  const { data: challenges } = useMyChallengeQuery();

  return (
    <Container>
      {challenges?.map((challenge) => (
        <ChallengeListElement
          key={challenge.challengeId}
          challenge={challenge}
        />
      ))}
    </Container>
  );
}

export default ChallengeListContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 36px;
  column-gap: 16px;

  width: 100%;

  ${media.medium`
    display: flex;
    flex-direction: column;
    gap: 35px;
  `}
`;
