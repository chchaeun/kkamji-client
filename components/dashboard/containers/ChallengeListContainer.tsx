import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import api from "../../../api/my-api";
import { getCode } from "../../../api/session-code";
import { media } from "../../../styles/media";
import { Challenge } from "../../../types/Challenge";
import ChallengeListElement from "../blocks/ChallengeListElement";

function ChallengeListContainer() {
  const { data: challenges } = useQuery<Challenge[]>(
    ["myChallenge"],
    async () => {
      api.defaults.headers.common["code"] = getCode();

      const { data } = await api.get("/my/challenges");
      return data;
    },
    {
      enabled: !!getCode(),
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
  gap: 24px;

  width: 100%;

  ${media.medium`
    display: flex;
    flex-direction: column;
    gap: 35px;
  `}
`;
