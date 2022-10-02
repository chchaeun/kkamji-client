import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import useChallengeDetailQuery from "../../../hooks/challenge-detail-query";
import { media } from "../../../styles/Media";

interface Props {
  challengeId: string;
}

function ChallengeListElement({ challengeId }: Props) {
  const { data: challengeDetail } = useChallengeDetailQuery({
    challengeId,
    suspense: true,
  });

  const [success] = useState(false);

  return (
    <>
      {challengeDetail && (
        <Link href={`/challenges/${challengeId}`}>
          <Container>
            {success ? (
              <CompleteImageBox
                bgImage={challengeDetail.imageUrl}
              ></CompleteImageBox>
            ) : (
              <IncompleteImageBox bgImage={challengeDetail.imageUrl}>
                <Icon icon="heroicons-solid:pencil-alt" color={"#ffffff"} />
              </IncompleteImageBox>
            )}
            <InfoBox>
              <Badges>
                {success ? (
                  <RedGreenBadge mission={"COMPLETE"}>완료</RedGreenBadge>
                ) : (
                  <RedGreenBadge mission={"INCOMPLETE"}>미완료</RedGreenBadge>
                )}
                <GrayBadge>문제제출현황 1/2</GrayBadge>
              </Badges>
              <div>
                <Title>
                  {challengeDetail.title} {challengeDetail.chapter}기
                </Title>
                <SubTitle>
                  {challengeDetail.university} {challengeDetail.department}{" "}
                  {challengeDetail.professorName} 교수님
                </SubTitle>
              </div>
            </InfoBox>
          </Container>
        </Link>
      )}
    </>
  );
}

export default ChallengeListElement;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  cursor: pointer;

  ${media.medium`
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 16px;
  `}
`;

const ImageBox = styled.div<{
  bgImage: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 180px;

  border-radius: 12px;

  ${media.medium`
    width: 82px;
    height: 74px;
    border-radius: 4px;
  `}

  svg {
    width: 36px;
    height: 36px;

    ${media.medium`
      width: 19px;
      height:19px;
    `}
  }
`;

const CompleteImageBox = styled(ImageBox)`
  background: url(${(p) => p.bgImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const IncompleteImageBox = styled(ImageBox)`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${(p) => p.bgImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Badges = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 6px;

  height: 30px;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 10px;
  gap: 10px;

  height: 30px;

  border-radius: 4px;

  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`;
const RedGreenBadge = styled(Badge)<{ mission: "COMPLETE" | "INCOMPLETE" }>`
  background: ${(p) => (p.mission === "COMPLETE" ? "#D1FAE5" : "#fee2e2")};

  color: ${(p) => (p.mission === "COMPLETE" ? "#047857" : "#b91c1c")};
`;
const GrayBadge = styled(Badge)`
  background: #f3f4f6;

  color: #4b5563;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #111827;

  padding-bottom: 4px;
`;

const SubTitle = styled.h3`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  color: #475569;

  opacity: 0.8;
`;
