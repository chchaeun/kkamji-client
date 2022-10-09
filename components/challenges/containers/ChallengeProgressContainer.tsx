import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import styled from "styled-components";
import {
  useChallengeDetailQuery,
  useCurrentWeekQuery,
  useOpenWeeksQuery,
} from "../../../api/challenges/hooks";
import { media } from "../../../styles/media";
import OpenWeekList from "../blocks/ChallengeOpenWeekList";
interface Props {
  challengeId: string;
}
function ChallengeProgressContainer({ challengeId }: Props) {
  const { data: currentWeek } = useCurrentWeekQuery({ challengeId });
  const { data: openWeeks } = useOpenWeeksQuery({ challengeId });

  const { data: challengeDetail } = useChallengeDetailQuery({
    challengeId,
  });

  // 챌린지 미션 성공 또는 실패 횟수를 반환하는 함수이다.
  const missionCount = (status: "SUCCESS" | "FAIL" | "REMAIN") => {
    if (!openWeeks && !challengeDetail) {
      return 0;
    }
    const successCount = openWeeks!.weeks.filter(
      (week) => week.status === "READABLE" || week.status === "READABLE_CLOSED"
    ).length;

    const failCount = openWeeks!.weeks.filter(
      (week) => week.status === "UNREADABLE"
    ).length;

    if (status === "SUCCESS") {
      return successCount;
    } else if (status === "FAIL") {
      return failCount;
    } else {
      return challengeDetail!.totalWeeks - successCount - failCount;
    }
  };

  if (!challengeDetail) {
    return <></>;
  }

  return (
    <Container>
      <Title>나의 챌린지 현황</Title>
      {currentWeek && (
        <Block>
          <h3 className="flex items-center gap-2 text-lg">
            종강까지 {challengeDetail.totalWeeks - currentWeek}주
          </h3>
          <ProgressBar
            completed={currentWeek}
            bgColor="#4F46E5"
            height="28px"
            borderRadius="8px"
            baseBgColor="#E0E7FF"
            labelColor="#ffffff"
            labelSize={window.innerWidth > 700 ? "14px" : "12px"}
            animateOnRender
            maxCompleted={challengeDetail.totalWeeks}
            customLabel={`현재 ${currentWeek}주차`}
            customLabelStyles={{ fontWeight: 400, paddingRight: "10px" }}
          />
          <ProgressEndLabel color={"#3730a3"}>
            총 {challengeDetail.totalWeeks}주
          </ProgressEndLabel>
        </Block>
      )}

      {openWeeks && (
        <>
          <Block>
            <h3 className="flex items-center gap-2 text-lg">미션 달성률</h3>
            <ProgressBar
              completed={missionCount("SUCCESS")}
              bgColor="#059669"
              height="28px"
              borderRadius="8px"
              baseBgColor="#ECFDF5"
              labelColor="#ffffff"
              labelSize={window.innerWidth > 700 ? "14px" : "12px"}
              animateOnRender
              maxCompleted={challengeDetail.totalWeeks}
              customLabel={`${missionCount("SUCCESS")}회 (${Math.floor(
                (missionCount("SUCCESS") / openWeeks?.totalWeeks) * 100
              )}%)`}
              customLabelStyles={{ fontWeight: 400, paddingRight: "10px" }}
            />
            <ProgressEndLabel color={"#15803D"}>
              {challengeDetail.totalWeeks}회
            </ProgressEndLabel>
          </Block>
          <MissionBlock>
            <h3>주차별 미션</h3>
            <OpenWeekList openWeeks={openWeeks} />
          </MissionBlock>
        </>
      )}
      {openWeeks && currentWeek && (
        <BorderBox>
          <Card mission={"SUCCESS"}>
            <span>미션 성공</span>
            <span className="text-lg font-semibold">
              {missionCount("SUCCESS")}
            </span>
          </Card>
          <Card mission={"FAIL"}>
            <span>미션 실패</span>
            <span className="text-lg font-semibold">
              {missionCount("FAIL")}
            </span>
          </Card>
          <Card mission={"REMAIN"}>
            <span>남은 미션</span>
            <span className="text-lg font-semibold">
              {missionCount("REMAIN")}
            </span>
          </Card>
        </BorderBox>
      )}
    </Container>
  );
}

export default ChallengeProgressContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  padding: 20px 24px;

  position: relative;
  width: 100%;
  height: 473px;
  left: 0px;

  background: #ffffff;

  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  ${media.medium`
    height: 533px;
  `}
`;

const Title = styled.h2`
  position: relative;

  width: 100%;

  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #111827;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 90%;
  height: 53px;

  h3 {
    font-size: 14px;
    font-weight: 600;
  }

  ${media.medium`
    width: 100%;
  `}
`;

const ProgressEndLabel = styled.span<{ color: string }>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: end;

  width: 100%;
  right: 10px;
  bottom: 33px;

  color: ${(p) => p.color};
  font-size: 14px;

  ${media.medium`
    font-size: 12px;
    bottom: 31px;
   `}
`;

const MissionBlock = styled(Block)`
  ${media.medium`
    height: 137px;
   `}
`;

const BorderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 27px;

  width: 90%;
  height: 124px;

  border: 1px solid #f3f4f6;
  border-radius: 8px;

  ${media.medium`
    width: 100%;
    height: 136px;
  `}
`;

const Card = styled.div<{ mission: "SUCCESS" | "FAIL" | "REMAIN" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  span {
    &:first-child {
      font-size: 12px;
    }

    &:last-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      width: 62px;
      height: 62px;

      background: ${(p) =>
        p.mission === "SUCCESS"
          ? "#ecfdf5"
          : p.mission === "FAIL"
          ? "#FEF2F2"
          : "#F3F4F6"};
      border-radius: 8px;

      font-weight: 600;
      font-size: 32px;
      line-height: 38px;

      color: ${(p) =>
        p.mission === "SUCCESS"
          ? "#047857"
          : p.mission === "FAIL"
          ? "#EF4444"
          : "#4B5563"};

      ${media.medium`
        width: 50px;
        height: 50px;

        font-size: 26px;
    `}
    }
  }
`;
