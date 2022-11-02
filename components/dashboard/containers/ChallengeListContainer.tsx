import { QueryClient, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import styled from "styled-components";
import { fetchMyChallenge } from "../../../api/challenges";
import { getJwtToken } from "../../../api/getJwtToken";
import { media } from "../../../styles/media";
import { Challenge } from "../../../types/Challenge";
import ChallengeListElement from "../blocks/ChallengeListElement";

function ChallengeListContainer() {
  const { data: challenges } = useQuery<Challenge[]>(
    ["myChallenge"],
    fetchMyChallenge,
    {
      enabled: !!getJwtToken(),
      suspense: true,
    }
  );

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
