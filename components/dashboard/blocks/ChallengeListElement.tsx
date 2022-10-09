import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCurrentWeekQuery } from "../../../api/challenges/hooks";
import { useSubmitCountQuery } from "../../../api/quizzes/hooks";
import { media } from "../../../styles/media";
import { Challenge } from "../../../types/Challenge";

interface Props {
  challenge: Challenge;
}

function ChallengeListElement({ challenge }: Props) {
  const [complete, setComplete] = useState(false);

  const { data: currentWeek } = useCurrentWeekQuery({
    challengeId: String(challenge.challengeId),
  });

  const { data: quizCount } = useSubmitCountQuery({
    challengeId: String(challenge.challengeId),
    week: currentWeek || 0,
  });

  useEffect(() => {
    if (quizCount && quizCount >= 2) {
      setComplete(true);
    }
  }, [quizCount]);

  return (
    <>
      {challenge && challenge.applicationStatus === "ACCEPTED" && (
        <Link href={`/challenges/${challenge.challengeId}`}>
          <Container>
            {complete ? (
              <CompleteImageBox bgImage={challenge.imageUrl}>
                {quizCount && quizCount >= 3 && (
                  <Icon
                    icon="heroicons-solid:lightning-bolt"
                    color={"#10B981"}
                    fontSize={"32px"}
                    className="bolt"
                  />
                )}
              </CompleteImageBox>
            ) : (
              <IncompleteImageBox bgImage={challenge.imageUrl}>
                <Icon
                  icon="heroicons-solid:pencil-alt"
                  color={"#ffffff"}
                  className="pencil"
                />
              </IncompleteImageBox>
            )}
            <InfoBox>
              <Badges>
                {complete ? (
                  <RedGreenBadge mission={"COMPLETE"}>완료</RedGreenBadge>
                ) : (
                  <RedGreenBadge mission={"INCOMPLETE"}>미완료</RedGreenBadge>
                )}
                <GrayBadge>문제제출현황 {quizCount}/2</GrayBadge>
              </Badges>
              <div>
                <Title>
                  {challenge.title} {challenge.chapter}기
                </Title>
                <SubTitle>
                  {challenge.university} {challenge.department}{" "}
                  {challenge.professorName} 교수님
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

  .pencil {
    width: 36px;
    height: 36px;

    ${media.medium`
      width: 19px;
      height:19px;
    `}
  }
`;

const CompleteImageBox = styled(ImageBox)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 17px;

  background: url(${(p) => p.bgImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${media.medium`
    align-items: center;
    justify-content: center;
  `}

  .bolt {
    ${media.medium`
      height: 25px;
    `}

    path {
      stroke: #ffffff;
      stroke-width: 1px;
      stroke-linejoin: round;
    }
  }
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
