import { QueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { updateQuizGrade } from "../../../api/solve";
import { useQuizSolveQuery } from "../../../api/solve/hooks";
interface Props {
  quizId: string;
}

type RubricSelected = {
  score: number;
  solveRubric: string;
};
function QuizRubric({ quizId }: Props) {
  const queryClient = new QueryClient();
  const [rubricSelected, setRubricSelected] = useState<RubricSelected | null>();

  const [isFocus, setIsFocus] = useState(false);
  const [focusInput, setFocusInput] = useState<HTMLInputElement | null>();

  const { data: quizSolve, error } = useQuizSolveQuery({ quizId });

  const { mutate: mutateQuizGrade } = useMutation(
    (scoreBody: RubricSelected) => updateQuizGrade({ quizId, scoreBody }),
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

    let scoreBody = {
      ...JSON.parse(value),
    };
    scoreBody.score = Number(scoreBody.score);

    setFocusInput(e.target);
    setRubricSelected(scoreBody);
    setIsFocus(true);
  };

  const onGradeClick = () => {
    if (!rubricSelected) {
      return;
    }
    mutateQuizGrade(rubricSelected);
  };

  const onCancelClick = () => {
    if (focusInput) {
      focusInput.checked = false;
      setFocusInput(null);
    }
    setRubricSelected(null);
    setIsFocus(false);
  };
  return (
    <Container>
      {quizSolve?.solve.score !== null ? (
        <>
          <Title>채점 결과</Title>
          <BlueBox>
            <span>
              {quizSolve?.solve.rubric} <span aria-hidden>·</span>{" "}
              {quizSolve?.solve.score} 점
            </span>
          </BlueBox>
        </>
      ) : (
        <>
          <Title>채점하기</Title>
          {quizSolve?.quiz.rubric.map((rubric, index) => (
            <Label key={index} htmlFor={`bordered-radio-${index}`}>
              <RowDiv>
                <input
                  id={`bordered-radio-${index}`}
                  type="radio"
                  value={JSON.stringify({
                    score: rubric.score,
                    solveRubric: rubric.content,
                  })}
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
  flex-direction: row;
  padding: 16px;
  gap: 8px;

  width: 100%;

  background: #eef2ff;
  border-radius: 8px;
`;
