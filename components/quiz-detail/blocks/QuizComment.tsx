import { Icon } from "@iconify/react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { deleteComment } from "../../../api/comments";
import { Comment } from "../../../types/Comment";
import ContentsFormat from "../../../utils/ContentsFormat";
import { getDateFormat } from "../../../utils/DateFormat";
interface Props {
  quizId: string;
  comment: Comment;
}
function QuizComment({ quizId, comment }: Props) {
  const queryClient = new QueryClient();

  const [showDropdown, setShowDropdown] = useState(false);

  const {
    commentId,
    commentContent,
    commentCreatedDate,
    isMine,
    isQuizWriter,
    writerName,
  } = comment;

  const { mutate: mutateCommentDelete } = useMutation(
    (commentId: number) => deleteComment({ commentId }),
    {
      onSuccess: () => {
        window.location.reload();
        queryClient.invalidateQueries(["comments", quizId]);
      },
    }
  );

  const onDeleteClick = async (commentId: number) => {
    mutateCommentDelete(commentId);
  };

  const onDropdownClick = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <Container>
      <RoundProfile>
        <Icon icon="heroicons-solid:user" fontSize={22} color={"#ffffff"} />
      </RoundProfile>
      <Block>
        <Title>
          <RowDiv>
            <span>{writerName}</span>
            {isQuizWriter && (
              <span className="text-sm text-[#5c3cde]">작성자</span>
            )}
            <span className="text-sm text-gray-600">
              {getDateFormat(commentCreatedDate)}
            </span>
          </RowDiv>
          {isMine && (
            <DropdownBlock>
              <ThreeDotsButton clicked={showDropdown}>
                <Icon icon="bi:three-dots-vertical" onClick={onDropdownClick} />
              </ThreeDotsButton>
              {showDropdown && (
                <Dropdown>
                  <DeleteButton
                    type="button"
                    onClick={() => onDeleteClick(commentId)}
                  >
                    삭제
                  </DeleteButton>
                </Dropdown>
              )}
            </DropdownBlock>
          )}
        </Title>
        <ContentsFormat contents={commentContent} />
      </Block>
    </Container>
  );
}

export default QuizComment;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;

  width: 100%;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: #111827;
  }
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
`;

const RowDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    &:first-child {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;

      color: #111827;
    }
    &:last-child {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;

      color: #6b7280;
    }
  }
`;
const DropdownBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ThreeDotsButton = styled.button<{ clicked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  background: ${(p) => (p.clicked ? "#f3f4f6" : "#ffffff")};

  &:hover {
    background: #f3f4f6;
    mix-blend-mode: multiply;
    border-radius: 2px;
  }
`;
const Dropdown = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 0px;

  position: absolute;
  width: 72px;
  margin: 20px 0px;

  background: #ffffff;

  border: 1px solid #f3f4f6;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;

const DeleteButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;

  padding: 8px 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #ef4444;

  &:hover {
    background: #f3f4f6;
  }
`;
