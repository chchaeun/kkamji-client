import { Icon } from "@iconify/react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { updateComment } from "../../../api/comments";
interface Props {
  quizId: string;
}
type CommentValidForm = {
  comment: string;
};
function QuizCommentForm({ quizId }: Props) {
  const queryClient = new QueryClient();

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    reset,
    formState: { errors },
  } = useForm<CommentValidForm>();

  const commentRef = watch("comment");

  const [isFocus, setIsFocus] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const { mutate: mutateCommentSubmit } = useMutation(
    (commentBody: { content: string }) =>
      updateComment({ requestData: { commentBody, quizId } }),

    {
      onSuccess: () => {
        window.location.reload();
        queryClient.invalidateQueries(["comments", quizId]);
        resetField("comment");
        setDisabledSubmit(false);
      },
      onError: (err) => {
        queryClient.invalidateQueries(["comments", quizId]);
      },
      onMutate: () => {
        setDisabledSubmit(true);
      },
    }
  );

  const onCommentValid = ({ comment }: CommentValidForm) => {
    if (disabledSubmit) {
      return;
    }
    const commentBody = {
      content: comment,
    };
    mutateCommentSubmit(commentBody);
  };

  const onInputFocus = () => {
    setIsFocus(true);
  };

  const onCancelClick = () => {
    if (commentRef) {
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

  return (
    <Container>
      <RoundProfile>
        <Icon icon="heroicons-solid:user" fontSize={22} color={"#ffffff"} />
      </RoundProfile>
      <Form onSubmit={handleSubmit(onCommentValid)}>
        <InputBox
          rows={isFocus ? 3 : 1}
          {...register("comment", { required: "내용을 입력해주세요." })}
          onFocus={onInputFocus}
          placeholder={"의견 추가..."}
        />
        {errors && errors.comment?.message && <em>{errors.comment.message}</em>}
        {isFocus && (
          <Buttons>
            <button type="button" onClick={onCancelClick}>
              취소
            </button>
            <button type="submit" disabled={disabledSubmit}>
              {disabledSubmit && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
              등록
            </button>
          </Buttons>
        )}
      </Form>
    </Container>
  );
}

export default QuizCommentForm;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  width: 100%;
`;

const RoundProfile = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 42px;
  height: 42px;

  border-radius: 100%;

  background: #e5e7eb;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
`;

const InputBox = styled.textarea`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  gap: 10px;

  width: 100%;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 8px;

  resize: none;

  outline: none;

  &:focus {
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
