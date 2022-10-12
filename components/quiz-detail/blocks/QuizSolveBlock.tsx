import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../../../api/my-api";
import { updateQuizIsSolved } from "../../../api/quizzes";
import { QuizSolve } from "../../../types/Quiz";

interface Props {
  quizId: string;
}

type SolveValidForm = {
  solve: string;
};

function QuizSolveBlock({ quizId }: Props) {
  const [isFocus, setIsFocus] = useState(false);

  const {
    register: solveRegister,
    handleSubmit: handleSolveSubmit,
    formState: { errors: solveErrors },
    watch,
    reset,
  } = useForm<SolveValidForm>();

  const solveRef = watch("solve");

  const { data: quizSolve, error } = useQuery<QuizSolve, AxiosError>(
    ["quizSolve", quizId],
    async () => {
      const { data } = await api.get(`/quizzes/${quizId}/solve`);
      return data;
    },
    {
      enabled: !!quizId,
    }
  );

  const { mutate: mutateQuizIsSolved } = useMutation(
    (answer: string) => updateQuizIsSolved({ quizId, answer }),
    {
      mutationKey: ["quizIsSolved", quizId],
      onSuccess: () => {
        window.location.reload();
      },
      onError: (err) => {},
    }
  );

  const onInputFocus = () => {
    setIsFocus(true);
  };

  const onCancelClick = () => {
    if (solveRef) {
      const cancelConfirm = confirm(
        "작성한 내용이 사라집니다. 취소하시겠습니까?"
      );

      if (cancelConfirm) {
        reset();
      } else {
        return;
      }
    } else {
      reset();
    }
    setIsFocus(false);
  };

  const onSolveValid: SubmitHandler<SolveValidForm> = ({ solve }) => {
    mutateQuizIsSolved(solve);
    setIsFocus(false);
  };
  return (
    <Container>
      <Title>내 정답</Title>
      {error?.response?.status === 403 && (
        <Form onSubmit={handleSolveSubmit(onSolveValid)}>
          <InputBox
            placeholder="정답을 입력하세요."
            rows={3}
            onFocus={onInputFocus}
            {...solveRegister("solve", { required: true })}
          />
          {solveErrors.solve && solveErrors.solve.type === "required" && (
            <em>답은 필수 입력값입니다.</em>
          )}
          {isFocus && (
            <Buttons>
              <button type="button" onClick={onCancelClick}>
                취소
              </button>
              <button type="submit">등록</button>
            </Buttons>
          )}
        </Form>
      )}
      {quizSolve && <ContentBox>{quizSolve.solveAnswer}</ContentBox>}
    </Container>
  );
}

export default QuizSolveBlock;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #111827;
`;

const ContentBox = styled.div`
  box-sizing: border-box;

  display: flex;
  align-items: flex-start;
  padding: 16px;

  width: 100%;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 8px;

  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputBox = styled.textarea`
  box-sizing: border-box;

  display: flex;
  align-items: flex-start;
  padding: 16px;

  width: 100%;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 8px;

  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  resize: none;

  &:focus {
    outline: none !important;
    border: 1px solid #6366f1;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;

  width: 100%;

  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 6px;

    width: 72px;
    height: 36px;

    border-radius: 8px;

    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    &:first-child {
      background: #ffffff;

      &:hover {
        background: #f9fafb;
      }
    }
    &:last-child {
      background: #4f46e5;
      color: #ffffff;

      &:hover {
        background: #4338ca;
      }
    }
  }
`;
