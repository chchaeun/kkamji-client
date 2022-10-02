import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useChallengeDetailQuery from "../../../hooks/challenge-detail-query";
import { media } from "../../../styles/Media";
interface Props {
  challengeId: string;
}
interface FixItem {
  fixItem: boolean;
}

function ChallengeSuccessPeople({ challengeId }: Props) {
  const [scrollY, setScrollY] = useState(0);
  const [fixItem, setFixItem] = useState(false);

  const { data: challengeDetail } = useChallengeDetailQuery({ challengeId });

  useEffect(() => {
    (() => {
      window.addEventListener("scroll", () => setScrollY(window.pageYOffset));
      if (scrollY > 150) {
        setFixItem(true);
      } else {
        setFixItem(false);
      }
    })();
    return () => {
      window.removeEventListener("scroll", () =>
        setScrollY(window.pageYOffset)
      );
    };
  });

  return (
    <Container fixItem={fixItem}>
      🔥 이번주 {challengeDetail?.numberOfChallengerWhoCompleted}명 챌린지 미션
      완료!
    </Container>
  );
}

export default ChallengeSuccessPeople;

const Container = styled.div<FixItem>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 11px 10px;
  gap: 10px;

  position: ${(p) => (p.fixItem ? "fixed" : "relative")};
  width: ${(p: FixItem) => (p.fixItem ? "100vw" : "100%")};
  height: 41px;
  top: ${(p) => (p.fixItem ? "60px" : "0px")};

  background: #000000;
  border-radius: ${(p: FixItem) => (p.fixItem ? "0px" : "8px")};

  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  z-index: 10;
  ${media.medium`
    width: ${(p: FixItem) => (p.fixItem ? "100vw" : "100%")};
    top: ${(p: FixItem) => (p.fixItem ? "51px" : "0px")};

    font-size: 14px;
  `};
`;
