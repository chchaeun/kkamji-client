import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import styled from "styled-components";
import { media } from "../../styles/media";
import ChallengeOverview from "../challenges/ChallengeOverview";
import DeferredComponent from "../skeletons/DeferredComponent";
import QuizListSkeleton from "../skeletons/QuizListSkeleton";
import WeekFilter from "./blocks/QuizListWeekFilter";

const QuizListContainer = dynamic(
  () => import("./containers/QuizListContainer"),
  {
    suspense: true,
  }
);
interface Props {
  challengeId: string;
  page: "READABLE" | "MY" | "LIKED";
}
function QuizListPageTemplate({ challengeId, page }: Props) {
  return (
    <Background>
      <Frame>
        <ChallengeOverview challengeId={challengeId} />
        <Container>
          <WeekFilter challengeId={challengeId} />
          <Suspense
            fallback={
              <DeferredComponent>
                <QuizListSkeleton />
              </DeferredComponent>
            }
          >
            <QuizListContainer challengeId={challengeId} page={page} />
          </Suspense>
        </Container>
      </Frame>
    </Background>
  );
}

export default QuizListPageTemplate;

const Background = styled.div`
  background-color: #f8fafc;
`;

const Frame = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;

  padding: 80px 0px;

  width: 1040px;
  margin: 0 auto;

  background-color: #f8fafc;

  ${media.medium`
    width: 100%;
    padding: 88px 12px;
  `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  width: 100%;

  padding: 20px 24px;

  background-color: #ffffff;
`;
