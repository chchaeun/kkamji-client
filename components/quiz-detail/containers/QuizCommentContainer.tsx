import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { fetchComments } from "../../../api/comments";
import { Comment } from "../../../types/Comment";
import QuizComment from "../blocks/QuizComment";
import QuizCommentForm from "../blocks/QuizCommentForm";

interface Props {
  quizId: string;
}

function QuizCommentContainer({ quizId }: Props) {
  const router = useRouter();

  const { data: comments } = useQuery<Comment[]>(
    ["comments", quizId],
    () => fetchComments({ quizId }),
    {
      enabled: !!router.query.qid,
    }
  );

  return (
    <Container>
      <Title>의견</Title>
      <QuizCommentForm quizId={quizId} />
      {comments?.length === 0 && (
        <ContentBox>등록된 의견이 없습니다.</ContentBox>
      )}
      {comments?.map((comment) => (
        <QuizComment
          quizId={quizId}
          comment={comment}
          key={comment.commentId}
        />
      ))}
    </Container>
  );
}

export default QuizCommentContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 24px 36px;
  gap: 20px;

  width: 100%;

  background: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #111827;
`;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0px 0px 0px;

  width: 100%;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #6b7280;
`;
