import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Challenge } from "../../../types/Challenge";

function ChallengeListBlock({ challengeId }: Challenge) {
  return (
    <Link href={`/challenges/${challengeId}`} key={challengeId}>
      <Container>
        <ImageBox />
      </Container>
    </Link>
  );
}

export default ChallengeListBlock;

const Container = styled.div``;

const ImageBox = styled.div``;
