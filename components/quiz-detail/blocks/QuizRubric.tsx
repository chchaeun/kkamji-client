import { QueryClient, useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { updateQuizGrade } from "../../../api/quizzes";
import { useQuizDetailQuery } from "../../../api/quizzes/hooks";
interface Props {
  quizId: string;
}
function QuizRubric({ quizId }: Props) {
  const queryClient = new QueryClient();
  const [rubricScore, setRubricScore] = useState<number | null>();

  const [isFocus, setIsFocus] = useState(false);
  const [focusInput, setFocusInput] = useState<HTMLInputElement | null>();

  const { data: quizDetail } = useQuizDetailQuery({ quizId });

  const { mutate: mutateQuizGrade } = useMutation(
    (score: number) => updateQuizGrade({ quizId, score }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quizDetail", quizId]);
        window.location.reload();
      },
      onError: (err) => {},
    }
  );
  const onRubricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setFocusInput(e.target);
    setRubricScore(Number(value));
    setIsFocus(true);
  };

  const onGradeClick = () => {
    if (!rubricScore) {
      return;
    }
    mutateQuizGrade(rubricScore);
  };

  const onCancelClick = () => {
    if (focusInput) {
      focusInput.checked = false;
      setFocusInput(null);
    }
    setRubricScore(null);
    setIsFocus(false);
  };
  return (
    <Container>
      {quizDetail?.solveScore !== null ? (
        <>
          <Title>채점 결과</Title>
          <BlueBox>{quizDetail?.solveScore} 점</BlueBox>
        </>
      ) : (
        <>
          <Title>채점하기</Title>
          {quizDetail?.quizRubric?.map((rubric, index) => (
            <Label key={index} htmlFor={`bordered-radio-${index}`}>
              <RowDiv>
                <input
                  id={`bordered-radio-${index}`}
                  type="radio"
                  value={rubric.score}
                  name="bordered-radio"
                  onChange={onRubricChange}
                />
                <ContentText>{rubric.content}</ContentText>
              </RowDiv>
              <AccentText>{rubric.score}점</AccentText>
            </Label>
          ))}
          {isFocus && (
            <Buttons>
              <button type="button" onClick={onCancelClick}>
                취소
              </button>
              <button type="button" onClick={onGradeClick}>
                등록
              </button>
            </Buttons>
          )}
        </>
      )}
    </Container>
  );
}

export default QuizRubric;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #111827;
`;

const Label = styled.label`
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  padding: 16px;
  gap: 10px;

  width: 100%;

  border: 1px solid #e5e7eb;
  border-radius: 8px;

  cursor: pointer;

  &:has(input:checked) {
    border: 1px solid #6366f1;
  }
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;

  input[type="radio"] {
    width: 18px;
    height: 18px;
    border-radius: 100%;

    background-color: #e5e7eb;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input[type="radio"]:checked {
    width: 18px;
    height: 18px;
    border-radius: 100%;

    background-color: #ffffff;
    border: 5px solid #6366f1;
  }
`;
const ContentText = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #000000;
`;

const AccentText = styled.span`
  font-weight: 700;
  font-size: 14px;

  color: #4f46e5;
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

const BlueBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 8px;

  width: 100%;

  background: #eef2ff;
  border-radius: 8px;
`;
