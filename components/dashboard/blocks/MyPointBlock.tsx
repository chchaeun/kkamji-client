import { Icon } from "@iconify/react";
import React from "react";
import styled from "styled-components";
import { media } from "../../../styles/media";

function MyPointBlock() {
  return (
    <Container>
      <span>내 포인트</span>
      <RowBox>
        <span>5,400</span>
        <Icon icon="heroicons:information-circle-20-solid" />
      </RowBox>
    </Container>
  );
}

export default MyPointBlock;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px 10px 16px;
  gap: 10px;

  position: absolute;

  right: 270px;
  top: 190px;

  width: 180px;

  background: #10b981;
  border-radius: 6px;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: #ffffff;

  ${media.medium`
    position: relative;
    top: 0px;
    right: 0px;

    width: 100%;

    border-radius: 0px 0px 8px 8px;
  `}
`;

const RowBox = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;
