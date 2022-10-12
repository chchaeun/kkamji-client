import { Icon } from "@iconify/react";
import React from "react";
import styled from "styled-components";

function QuizPointBlock() {
  return (
    <Container>
      <span>이 문제로 얻은 포인트: 100</span>
      <Icon icon="heroicons:information-circle-20-solid" />
    </Container>
  );
}

export default QuizPointBlock;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;

  width: 100%;
  height: 37px;

  background: #10b981;
  border-radius: 6px;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: #ffffff;
`;
