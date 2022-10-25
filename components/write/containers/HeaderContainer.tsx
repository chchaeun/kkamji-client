import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import {
  useChallengeDetailQuery,
  useCurrentWeekQuery,
} from "../../../api/challenges/hooks";
import { useSubmitCountQuery } from "../../../api/quizzes/hooks";

interface Props {
  challengeId: string;
}

function HeaderContainer({ challengeId }: Props) {
  const { data: challenge } = useChallengeDetailQuery({ challengeId });
  const { data: currentWeek } = useCurrentWeekQuery({ challengeId });
  const { data: submitCount } = useSubmitCountQuery({
    challengeId,
    week: currentWeek || 0,
  });

  const router = useRouter();

  const onLinkClick = (link: string) => {
    const pageLeaveConfirmMessage =
      "페이지를 떠나시겠습니까? 변경 사항이 저장되지 않을 수 있습니다.";
    const pageLeave = confirm(pageLeaveConfirmMessage);
    if (pageLeave) {
      router.push(link);
    }
  };

  return (
    <Container>
      <BreadCrump>
        <BreadCrumpButton type="button" onClick={() => onLinkClick(`/`)}>
          내 챌린지
        </BreadCrumpButton>
        <Dash aria-hidden>/</Dash>
        <BreadCrumpButton
          type="button"
          onClick={() => onLinkClick(`/challenges/${challengeId}`)}
        >
          {challenge?.title}
        </BreadCrumpButton>
        <Dash aria-hidden>/</Dash>
        <BreadCrumpButton
          type="button"
          onClick={() => onLinkClick(`/challenges/${challengeId}/write`)}
        >
          문제 제출하기
        </BreadCrumpButton>
      </BreadCrump>
      <Horizontal />
      <TitleBlock>
        <Badges>
          <Badge color={"BLACK"}>{currentWeek}주차</Badge>
          <Badge color={"GREEN"}>문제 제출 현황 {submitCount}/2</Badge>
        </Badges>
        <Title>{challenge?.title}</Title>
      </TitleBlock>
    </Container>
  );
}

export default HeaderContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 24px;
  width: 100%;

  background: #ffffff;
  border-radius: 8px;
`;

const BreadCrump = styled.div`
  display: flex;
  gap: 7px;
  padding: 4px 0px;
`;

const BreadCrumpButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 6px;
  gap: 10px;

  background: #ffffff;
  border-radius: 2px;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: #6b7280;

  &:hover {
    background: #f3f4f6;
  }
`;
const Dash = styled.span`
  display: flex;
  align-items: center;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: #d1d5db;
`;
const Horizontal = styled.hr`
  width: 100%;
  height: 0px;
  border: 0.5px solid #f3f4f6;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 0px;
`;

const Badges = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
`;

const Badge = styled.span<{ color: "BLACK" | "GREEN" }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 10px;
  gap: 10px;

  background: ${(p) => (p.color === "BLACK" ? "#374151" : "#ECFDF5")};
  border-radius: 4px;

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${(p) => (p.color === "BLACK" ? "#ffffff" : "#15803D")};
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;

  color: #111827;
`;
