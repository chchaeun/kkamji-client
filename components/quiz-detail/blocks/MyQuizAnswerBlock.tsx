import { Icon } from "@iconify/react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import { apiV1 } from "../../../api/utils/myApi";
import { QuizEdit } from "../../../types/Quiz";
import { useMyQuizDetailQuery } from "../../../api/quizzes/hooks";

interface Props {
  quizId: string;
}

type EditValidForm = {
  answer: string;
  explanation: string;
  rubric: {
    score: number;
    content: string;
  }[];
};
function MyQuizAnswerBlock({ quizId }: Props) {
  const queryClient = new QueryClient();

  const [isAnswerFocus, setIsAnswerFocus] = useState(false);
  const [isExplanationFocus, setIsExplanationFocus] = useState(false);

  const [rubricEdit, setRubricEdit] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    resetField,
  } = useForm<EditValidForm>();

  const answerRef = watch("answer");
  const explanationRef = watch("explanation");

  const onCancelClick = (field: "answer" | "explanation") => {
    const confirmAndReset = () => {
      const cancelConfirm = confirm(
        "작성한 내용이 사라집니다. 취소하시겠습니까?"
      );

      if (cancelConfirm) {
        resetField(field);
      } else {
        return;
      }
    };
    switch (field) {
      case "answer":
        if (answerRef) {
          confirmAndReset();
        } else {
          resetField(field);
        }
        setIsAnswerFocus(false);
        break;
      case "explanation":
        if (explanationRef) {
          confirmAndReset();
        } else {
          resetField(field);
        }
        setIsExplanationFocus(false);
        break;
    }
  };

  const onRubricEditCancelClick = () => {
    setRubricEdit(false);
  };

  const onInputFocus = (field: "answer" | "explanation") => {
    switch (field) {
      case "answer":
        setIsAnswerFocus(true);
        break;
      case "explanation":
        setIsExplanationFocus(true);
        break;
    }
  };

  const onRubricEditClick = () => {
    setRubricEdit(true);
  };

  const { fields, append, remove } = useFieldArray<EditValidForm>({
    control,
    name: "rubric",
  });

  const { data: quizDetail, error } = useMyQuizDetailQuery({
    quizId,
    successHandler: (data: {
      quizAnswer: any;
      quizExplanation: any;
      quizRubric: any;
    }) => {
      reset({
        answer: data.quizAnswer,
        explanation: data.quizExplanation,
        rubric: data.quizRubric,
      });
    },
  });

  const { mutate: mutateAnswerEdit } = useMutation(
    async (editBody: QuizEdit) => {
      return await apiV1.patch(`/quizzes/${quizId}`, editBody);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myQuizDetail", quizId]);
        window.location.reload();
      },
      onMutate: () => {
        setIsAnswerFocus(false);
        setIsExplanationFocus(false);
        setRubricEdit(false);
      },
      retryDelay: 3000,
    }
  );

  const onEditValid: SubmitHandler<EditValidForm> = ({
    answer,
    explanation,
    rubric,
  }) => {
    const editBody = {
      quizAnswer: answer,
      quizExplanation: explanation,
      quizRubric: JSON.stringify(rubric),
    };
    mutateAnswerEdit(editBody);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onEditValid)}>
        {quizDetail?.quizAnswer && (
          <ColDiv>
            <Title>정답</Title>
            <InputBox
              {...register("answer", { required: true })}
              defaultValue={quizDetail.quizAnswer
                .replaceAll("\t", "\u00a0 \u00a0 \u00a0 \u00a0")
                .replaceAll("\\t", "\u00a0 \u00a0 \u00a0 \u00a0")}
              rows={Math.max(
                quizDetail.quizAnswer.split("\n").length + 1,
                Math.ceil(quizDetail.quizAnswer.length / 60)
              )}
              onFocus={() => onInputFocus("answer")}
            />
            {isAnswerFocus && (
              <Buttons>
                <button type="button" onClick={() => onCancelClick("answer")}>
                  취소
                </button>
                <button type="submit">수정</button>
              </Buttons>
            )}
          </ColDiv>
        )}
        {quizDetail?.quizExplanation && (
          <ColDiv>
            <Title>해설</Title>
            <InputBox
              {...register("explanation", { required: true })}
              defaultValue={quizDetail.quizExplanation
                .replaceAll("\t", "\u00a0 \u00a0 \u00a0 \u00a0")
                .replaceAll("\\t", "\u00a0 \u00a0 \u00a0 \u00a0")}
              rows={Math.max(
                quizDetail.quizExplanation.split("\n").length + 1,
                Math.ceil(quizDetail.quizExplanation.length / 60)
              )}
              onFocus={() => onInputFocus("explanation")}
            />
            {isExplanationFocus && (
              <Buttons>
                <button
                  type="button"
                  onClick={() => onCancelClick("explanation")}
                >
                  취소
                </button>
                <button type="submit">수정</button>
              </Buttons>
            )}
          </ColDiv>
        )}
        {quizDetail?.quizRubric && (
          <ColDiv>
            <RowDiv>
              <Title>채점 기준</Title>
              {!rubricEdit && (
                <button type="button" onClick={onRubricEditClick}>
                  수정
                </button>
              )}
            </RowDiv>
            {!rubricEdit &&
              quizDetail?.quizRubric?.map((rubric, index) => (
                <ContentBox key={index}>
                  <ContentText>{rubric.content}</ContentText>
                  <AccentText>{rubric.score}점</AccentText>
                </ContentBox>
              ))}
            {rubricEdit && (
              <div>
                {fields.map((item, index) => (
                  <RubricBlock key={item.id}>
                    <input
                      {...register(`rubric.${index}.content`, {
                        required: "채점 기준은 필수 입력값입니다.",
                      })}
                    />
                    <input
                      {...register(`rubric.${index}.score`, {
                        required: "점수는 필수 입력값입니다.",
                      })}
                    />
                    <button type="button" onClick={() => remove(index)}>
                      <Icon
                        icon="akar-icons:circle-minus-fill"
                        color={"#6366f1"}
                      />
                    </button>
                  </RubricBlock>
                ))}
                <em className="block py-3">
                  {errors.rubric && errors.rubric[0]?.score?.message}
                </em>
                <em className="block">
                  {errors.rubric && errors.rubric[0]?.content?.message}
                </em>
                <div className="flex justify-center w-full p-5 text-3xl sm:pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      append({ score: 0, content: "" });
                    }}
                  >
                    <Icon
                      icon="akar-icons:circle-plus-fill"
                      color={"#6366f1"}
                      fontSize={26}
                    />
                  </button>
                </div>
              </div>
            )}
            {rubricEdit && (
              <Buttons>
                <button type="button" onClick={onRubricEditCancelClick}>
                  취소
                </button>
                <button type="submit">수정</button>
              </Buttons>
            )}
          </ColDiv>
        )}
      </Form>
    </Container>
  );
}

export default MyQuizAnswerBlock;

const Container = styled.div`
  display: flex;
  flex-direction: column;

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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 10px;

  width: 100%;
  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const RowDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 14px;

    color: #8f8f8f;
  }
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

const RubricBlock = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  margin: 8px 0px;

  input {
    display: flex;
    align-items: flex-start;
    padding: 16px;

    background: #ffffff;

    border: 1px solid #e5e7eb;
    border-radius: 8px;

    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    &:focus {
      outline: none !important;
      border: 1px solid #6366f1;
    }
    &:first-child {
      width: 90%;
    }
    &:last-child {
      width: 5%;
    }
  }
  button {
    display: flex;
    align-items: center;
    padding: 0px 4px;

    width: 5%;

    font-size: 26px;
  }
`;
