import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ImageInputBlock from "../blocks/ImageInputBlock";
import { Icon } from "@iconify/react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateQuiz } from "../../../api/quizzes";
import ManualBox from "../blocks/ManualBox";

interface Props {
  challengeId: string;
  isManual?: boolean;
}

type QuizWriteValidForm = {
  title: string;
  content: string;
  answer: string;
  explanation: string;
  rubric: {
    score: number;
    content: string;
  }[];
};

function WriteContainer({ challengeId, isManual }: Props) {
  const queryClient = new QueryClient();

  const [contentImage, setContentImage] = useState<File | null>(null);

  const MAX_LENGTH = {
    title: 50,
    content: 3500,
    answer: 3500,
    explanation: 3500,
    rubric: 50,
  };

  const RUBRIC_SCORE = [10, 5, 3, 1];

  const { register, control, handleSubmit, watch, reset } =
    useForm<QuizWriteValidForm>({
      defaultValues: {
        rubric: [
          {
            score: 10,
            content: "",
          },
        ],
      },
    });

  const titleRef = useRef<string | null>(null);
  titleRef.current = watch("title");

  const contentRef = useRef<string | null>(null);
  contentRef.current = watch("content");

  const answerRef = useRef<string | null>(null);
  answerRef.current = watch("answer");

  const explanationRef = useRef<string | null>(null);
  explanationRef.current = watch("explanation");

  const rubricRef = useRef<any>(null);
  rubricRef.current = watch("rubric");

  const { fields, append, remove } = useFieldArray<QuizWriteValidForm>({
    control,
    name: "rubric",
  });

  const { mutate: mutateQuizSubmit, isLoading } = useMutation(
    (quizSubmitBody: FormData) => updateQuiz({ challengeId, quizSubmitBody }),
    {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries(["quizCurrentSubmit"]);
        window.location.reload();
      },
      retryDelay: 3000,
    }
  );

  const isDisabled = () => {
    if (isLoading) {
      return true;
    }

    for (const value of rubricRef.current) {
      if (!value.score || !value.content) {
        return true;
      }
    }
    if (
      titleRef.current &&
      contentRef.current &&
      answerRef.current &&
      explanationRef.current
    ) {
      return false;
    } else {
      return true;
    }
  };

  const maxLengthValidation = ({
    currentLength,
    maxLength,
  }: {
    currentLength: number;
    maxLength: number;
  }) => {
    if (currentLength > maxLength) {
      return true;
    } else {
      return false;
    }
  };

  const onQuizSubmitValid: SubmitHandler<QuizWriteValidForm> = async ({
    title,
    content,
    answer,
    explanation,
    rubric,
  }) => {
    if (isDisabled()) {
      return;
    }

    const quizSubmitFormData = new FormData();

    const createQuizRequest = {
      quizTitle: title,
      quizContent: content,
      quizAnswer: answer,
      quizExplanation: explanation,
      quizRubric: JSON.stringify(rubric),
    };

    quizSubmitFormData.append(
      "createQuizRequest",
      new Blob([JSON.stringify(createQuizRequest)], {
        type: "application/json",
      })
    );

    if (contentImage) {
      quizSubmitFormData.append("quizFiles", contentImage);
    }

    if (isManual) {
      alert("매뉴얼은 실제로 제출되지 않습니다.");
      return;
    }
    mutateQuizSubmit(quizSubmitFormData);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onQuizSubmitValid)}>
        <Block>
          <Title>
            문제 제목 <span>*</span>
          </Title>
          <Input
            type="text"
            placeholder="키워드를 포함해주세요."
            isError={maxLengthValidation({
              currentLength: titleRef.current?.length,
              maxLength: MAX_LENGTH.title,
            })}
            {...register("title", {
              required: true,
              maxLength: MAX_LENGTH.title,
              pattern: {
                value: /[^ ]/,
                message: "문제 제목은 필수 입력값입니다.",
              },
            })}
          />
          <RowDiv>
            <ErrorMessage>
              {maxLengthValidation({
                currentLength: titleRef.current?.length,
                maxLength: MAX_LENGTH.title,
              }) && `${MAX_LENGTH.title}자까지 입력 가능합니다.`}
            </ErrorMessage>
            <TextCount>
              {titleRef.current?.length || 0}/{MAX_LENGTH.title}
            </TextCount>
          </RowDiv>
          {isManual && <ManualBox index={1} />}
        </Block>
        <Block>
          <Title>
            문제 내용 <span>*</span>
          </Title>
          <Input
            as="textarea"
            rows={6}
            placeholder="문제를 입력해주세요."
            isError={maxLengthValidation({
              currentLength: contentRef.current?.length,
              maxLength: MAX_LENGTH.content,
            })}
            {...register("content", {
              required: true,
              maxLength: MAX_LENGTH.content,
              pattern: {
                value: /[^ ]/,
                message: "문제 내용은 필수 입력값입니다.",
              },
            })}
          />
          <RowDiv>
            <ErrorMessage>
              {maxLengthValidation({
                currentLength: contentRef.current?.length,
                maxLength: MAX_LENGTH.content,
              }) && `${MAX_LENGTH.content}자까지 입력 가능합니다.`}
            </ErrorMessage>
            <TextCount>
              {contentRef.current?.length || 0}/{MAX_LENGTH.content}
            </TextCount>
          </RowDiv>
          {isManual && <ManualBox index={2} />}
        </Block>
        <Block>
          <Title>문제 이미지 첨부</Title>
          <ImageInputBlock
            contentImageState={{ contentImage, setContentImage }}
          />
          {isManual && <ManualBox index={3} isLeft={true} />}
        </Block>
        <Block>
          <Title>
            문제 정답 <span>*</span>
          </Title>
          <Input
            as="textarea"
            rows={6}
            placeholder="문제의 정답을 입력해주세요."
            isError={maxLengthValidation({
              currentLength: answerRef.current?.length,
              maxLength: MAX_LENGTH.answer,
            })}
            {...register("answer", {
              required: true,
              maxLength: MAX_LENGTH.answer,
              pattern: {
                value: /[^ ]/,
                message: "문제 정답은 필수 입력값입니다.",
              },
            })}
          />
          <RowDiv>
            <ErrorMessage>
              {maxLengthValidation({
                currentLength: answerRef.current?.length,
                maxLength: MAX_LENGTH.answer,
              }) && `${MAX_LENGTH.answer}자까지 입력 가능합니다.`}
            </ErrorMessage>
            <TextCount>
              {answerRef.current?.length || 0}/{MAX_LENGTH.answer}
            </TextCount>
          </RowDiv>
          {isManual && <ManualBox index={4} isLeft={true} />}
        </Block>
        <Block>
          <Title>
            문제 해설 <span>*</span>
          </Title>
          <Input
            as="textarea"
            rows={6}
            placeholder="문제의 해설을 입력해주세요."
            isError={maxLengthValidation({
              currentLength: explanationRef.current?.length,
              maxLength: MAX_LENGTH.explanation,
            })}
            {...register("explanation", {
              required: true,
              maxLength: MAX_LENGTH.explanation,
              pattern: {
                value: /[^ ]/,
                message: "문제 해설은 필수 입력값입니다.",
              },
            })}
          />
          <RowDiv>
            <ErrorMessage>
              {maxLengthValidation({
                currentLength: explanationRef.current?.length,
                maxLength: MAX_LENGTH.explanation,
              }) && `${MAX_LENGTH.explanation}자까지 입력 가능합니다.`}
            </ErrorMessage>
            <TextCount>
              {explanationRef.current?.length || 0}/{MAX_LENGTH.explanation}
            </TextCount>
          </RowDiv>
          {isManual && <ManualBox index={5} />}
        </Block>
        <Block>
          <Title>
            채점 기준 <span>*</span>
            {/* <Icon icon="heroicons:information-circle-20-solid" /> */}
          </Title>
          <RubricBox>
            {fields.map((item, index) => (
              <Rubric key={item.id}>
                <RubricColDiv>
                  <InputBox>
                    <Input
                      type="number"
                      isError={
                        rubricRef.current &&
                        (rubricRef.current[index].score > 10 ||
                          rubricRef.current[index].score < 1)
                      }
                      {...register(`rubric.${index}.score`, {
                        required: "점수는 필수 입력값입니다.",
                        max: {
                          value: 10,
                          message: "점수는 10 이하여야 합니다.",
                        },
                        min: {
                          value: 1,
                          message: "점수는 1 이상이어야 합니다.",
                        },
                      })}
                      defaultValue={RUBRIC_SCORE[index]}
                    />
                    <Input
                      isError={
                        rubricRef.current &&
                        maxLengthValidation({
                          currentLength:
                            rubricRef.current[index].content?.length,
                          maxLength: MAX_LENGTH.rubric,
                        })
                      }
                      {...register(`rubric.${index}.content`, {
                        required: "채점 기준은 필수 입력값입니다.",
                        pattern: {
                          value: /[^ ]/,
                          message: "채점 기준은 필수 입력값입니다.",
                        },
                      })}
                    />
                  </InputBox>
                  <RowDiv>
                    <ErrorMessage>
                      {rubricRef.current && rubricRef.current[index].score > 10
                        ? "점수는 10 이하여야 합니다."
                        : rubricRef.current[index].score < 1
                        ? "점수는 1 이상이어야 합니다."
                        : maxLengthValidation({
                            currentLength:
                              rubricRef.current[index].content?.length,
                            maxLength: MAX_LENGTH.rubric,
                          }) && `${MAX_LENGTH.rubric}자까지 입력 가능합니다.`}
                    </ErrorMessage>
                    <TextCount>
                      {(rubricRef.current &&
                        rubricRef.current[index].content?.length) ||
                        0}
                      /{MAX_LENGTH.rubric}
                    </TextCount>
                  </RowDiv>
                </RubricColDiv>
                {index !== 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    <Icon
                      icon="akar-icons:circle-minus-fill"
                      color={"#EF4444"}
                      fontSize={20}
                    />
                  </button>
                )}
              </Rubric>
            ))}
            {rubricRef.current?.length < 4 && (
              <RubricButton
                type="button"
                onClick={() => {
                  append({ score: 0, content: "" });
                }}
              >
                채점 기준 추가하기 +
              </RubricButton>
            )}
          </RubricBox>
          {isManual && <ManualBox index={6} />}
        </Block>
        <FormButton type="submit" isDisabled={isDisabled()}>
          문제 제출하기
        </FormButton>
      </Form>
    </Container>
  );
}

export default WriteContainer;

const Container = styled.div`
  padding: 32px 36px 36px 36px;
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  position: relative;
`;

const Title = styled.h3`
  display: flex;
  gap: 4px;

  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #111827;

  span {
    position: relative;
    bottom: 2px;

    font-weight: 700;
    font-size: 14px;
    line-height: 17px;

    color: #ef4444;
  }
`;

const Input = styled.input<{ isError: boolean }>`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  gap: 10px;

  width: 100%;
  margin-top: 4px;

  background: #ffffff;

  border: 1px solid ${(p) => (p.isError ? "#EF4444" : "#e5e7eb")};
  border-radius: 8px;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  &:focus {
    outline: none;
    border: 1px solid ${(p) => (p.isError ? "#EF4444" : "#6366f1")};
  }
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled.div`
  width: fit-content;

  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  color: #ef4444;
`;

const TextCount = styled.div`
  width: fit-content;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: right;

  color: #9ca3af;
`;

const RubricBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 32px;
  gap: 8px;

  width: 100%;

  background: #f9fafb;
  border-radius: 8px;
`;

const Rubric = styled.div`
  display: flex;
  gap: 12px;

  width: 100%;

  button {
    padding: 0px 10px 20px 0px;
  }
`;

const RubricColDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
`;

const InputBox = styled.div`
  display: flex;
  gap: 12px;

  width: 100%;

  input:first-child {
    width: 80px;
  }
`;

const RubricButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 6px;

  background: #111827;
  border-radius: 8px;

  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  color: #ffffff;

  &:hover {
    background: #1f2937;
  }
`;

const FormButton = styled.button<{ isDisabled: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 10px;

  width: 100%;

  background: ${(p) => (p.isDisabled ? "#D1D5DB" : "#4f46e5")};
  cursor: ${(p) => (p.isDisabled ? "default" : "pointer")};

  border-radius: 12px;

  font-weight: 600;
  font-size: 16px;
  line-height: 16px;

  color: #ffffff;

  &:hover {
    background: ${(p) => (p.isDisabled ? "#D1D5DB" : "#4338ca")};
    cursor: ${(p) => (p.isDisabled ? "normal" : "pointer")};
  }
`;
