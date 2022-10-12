import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import QuizCommentContainer from "../../../../../components/quiz-detail/containers/QuizCommentContainer";
import QuizContentContainer from "../../../../../components/quiz-detail/containers/QuizContentContainer";
import QuizNavigation from "../../../../../components/quiz-detail/containers/QuizNavigation";
import { media } from "../../../../../styles/media";

function QuizDetailPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const quizId = String(router.query.qid);
  const week = String(router.query.week);

  return (
    <Background>
      <Frame>
        <QuizContentContainer challengeId={challengeId} quizId={quizId} />
        <QuizNavigation
          challengeId={challengeId}
          quizId={quizId}
          week={week}
          page={"READABLE"}
        />
        <QuizCommentContainer quizId={quizId} />
      </Frame>
    </Background>
  );
}

export default QuizDetailPage;

const Background = styled.div`
  background-color: #f8fafc;
`;

const Frame = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  padding: 80px 0px;

  width: 720px;
  margin: 0 auto;

  background-color: #f8fafc;

  ${media.medium`
    width: 100%;
    padding: 60px 12px;
  `}
`;
