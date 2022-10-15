import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useChallengeDetailQuery } from "../../api/challenges/hooks";
import { media } from "../../styles/media";
import HeadTitle from "../common/HeadTitle";
interface Props {
  challengeId: string;
}
function ChallengeOverview({ challengeId }: Props) {
  const { data: challengeDetail } = useChallengeDetailQuery({ challengeId });

  return (
    <>
      <HeadTitle name={`${challengeDetail?.title} 챌린지 : 깜지`} />
      {challengeDetail && (
        <Container
          bgImage={challengeDetail.imageUrl}
          className="w-[1036px] h-[140px] rounded-lg bg-black"
        >
          <Block>
            <Link href={`/challenges/${challengeId}`}>
              <Title titleLength={challengeDetail.title.length}>
                {challengeDetail.title} {challengeDetail.chapter}기
              </Title>
            </Link>
            <Description>
              {[
                challengeDetail.university,
                challengeDetail.department,
                challengeDetail.professorName,
              ].join(" ")}
            </Description>
          </Block>
        </Container>
      )}
    </>
  );
}

export default ChallengeOverview;

const Container = styled.div<{ bgImage: string }>`
  position: relative;
  width: 100%;
  height: 140px;

  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${(p) => p.bgImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  border-radius: 8px;

  ${media.medium`
    width: 100%;
    height: 130px;

    border-radius: 0px;
  `}
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  position: relative;
  width: 100%;
  height: 63px;
  left: 24px;
  top: 57px;

  ${media.medium`
    width: 320px;
    height: 54px;
    left: 20px;
    top: 56px;
  `}
`;

const Title = styled.h1<{ titleLength: number }>`
  width: 100%;
  height: 38px;

  font-weight: 600;
  font-size: 32px;
  line-height: 38px;

  cursor: pointer;

  color: #ffffff;

  ${media.medium`
    font-size: ${(p: { titleLength: number }) =>
      p.titleLength > 20 ? "24px" : "20px"};
    line-height: ${(p: { titleLength: number }) =>
      p.titleLength > 20 ? "29px" : "24px"};
  `}
`;

const Description = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #ffffff;
  opacity: 0.8;

  ${media.medium`
    font-size: 14px;
    line-height: 17px;
  `}
`;
