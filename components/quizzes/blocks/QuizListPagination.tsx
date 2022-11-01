import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { currentPageState } from "../stores/currentPage";

interface Props {
  quizListLength: number;
}

interface ArrowButtonProps {
  direction: "prev" | "next";
}

function QuizListPagination({ quizListLength }: Props) {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const pageLimit = 10;
  const numberOfPage = Math.ceil(quizListLength / pageLimit);

  const [pageBlock, setPageBlock] = useState(0);

  useEffect(() => {
    if (currentPage % 10 === 0 || (currentPage + 1) % 10 === 0) {
      setPageBlock(Math.floor(currentPage / 10));
    }
  }, [currentPage]);

  const onArrowButtonClick = ({ direction }: ArrowButtonProps) => {
    switch (direction) {
      case "prev":
        if (currentPage > 0) {
          setCurrentPage((prevPage: number) => prevPage - 1);
        }
        break;
      case "next":
        if (currentPage < numberOfPage) {
          setCurrentPage((prevPage: number) => prevPage + 1);
        }
        break;
    }
  };

  const onNumberButtonClick = ({ page }: { page: number }) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <ArrowButton
        disabled={currentPage <= 0}
        isDisabled={currentPage <= 0}
        onClick={() => onArrowButtonClick({ direction: "prev" })}
      >
        <Icon
          icon="zondicons:cheveron-left"
          color={currentPage <= 0 ? "#E5E7EB" : "#9CA3AF"}
        />
      </ArrowButton>
      {Array.from({ length: numberOfPage }, (value, index) => index)
        .slice(pageBlock * 10, pageBlock * 10 + 10)
        .map((value, index) => (
          <Button
            key={index}
            onClick={() => onNumberButtonClick({ page: value })}
            isCurrentPage={currentPage === value}
          >
            {value + 1}
          </Button>
        ))}
      <ArrowButton
        disabled={currentPage >= numberOfPage - 1}
        isDisabled={currentPage >= numberOfPage - 1}
        onClick={() => onArrowButtonClick({ direction: "next" })}
      >
        <Icon
          icon="zondicons:cheveron-right"
          color={currentPage >= numberOfPage - 1 ? "#E5E7EB" : "#9CA3AF"}
        />
      </ArrowButton>
    </Container>
  );
}

export default QuizListPagination;

const Container = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const ArrowButton = styled.button<{ isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;

  border-radius: 4px;
  cursor: ${(p) => (p.isDisabled ? "default" : "pointer")};

  &:hover {
    background: ${(p) => (p.isDisabled ? "#ffffff" : "#f3f4f6")};
  }
`;

const Button = styled.button<{ isCurrentPage: boolean }>`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  gap: 10px;

  width: 34px;
  height: 34px;

  background: ${(p) => (p.isCurrentPage ? "#ffffff" : "#F9FAFB")};

  border: 1px solid #e5e7eb;
  border-radius: 4px;

  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  color: ${(p) => (p.isCurrentPage ? "#4f46e5" : "#9CA3AF")};
`;
