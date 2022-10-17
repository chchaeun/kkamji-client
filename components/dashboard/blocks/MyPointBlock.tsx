import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { fetchMyPoint } from "../../../api/point";
import { media } from "../../../styles/media";
import { MyPoint } from "../../../types/Point";

function MyPointBlock() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { data: point } = useQuery<MyPoint, AxiosError, number>(
    ["point"],
    fetchMyPoint,
    {
      select: (data) => data.point,
    }
  );

  return (
    <>
      <Container>
        <span>내 포인트</span>
        <RowBox>
          <span>{point?.toLocaleString()}</span>
          <InfoIcon>
            <Icon
              icon="heroicons:information-circle-20-solid"
              onMouseOver={() => setIsMouseOver(true)}
              onMouseOut={() => setIsMouseOver(false)}
              onClick={() => setIsClicked((prev) => !prev)}
            />
          </InfoIcon>
        </RowBox>
      </Container>
      {(isMouseOver || isClicked) && (
        <TooltipBlock>
          <TooltipTail />
          <Tooltip>
            내 문제가 풀렸을 때 쌓이는 포인트입니다. <br />
            포인트 사용은 서포터즈에게 문의해주세요.
          </Tooltip>
        </TooltipBlock>
      )}
    </>
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
  width: 180px;
  margin: 10px 24px;

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
    margin: 0;

    border-radius: 0px 0px 8px 8px;
  `}
`;

const RowBox = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;

  z-index: 10;
`;

const InfoIcon = styled.span`
  cursor: pointer;
`;

const TooltipBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  position: absolute;
`;
const TooltipTail = styled.span`
  position: relative;
  width: 8px;
  height: 8px;

  top: 52px;
  right: 38px;

  ${media.medium`
    top: 74px;
    right: 16px;
  `}

  transform: rotate(45deg);

  background: rgba(0, 0, 0);
`;
const Tooltip = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  width: 243px;
  height: 58px;

  top: 48px;
  right: 24px;

  ${media.medium`
    top: 68px;
    right: 0px;
  `}

  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;

  background: rgba(0, 0, 0);
  border-radius: 6px;

  color: #ffffff;
`;
