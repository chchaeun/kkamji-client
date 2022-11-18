import React from "react";
import styled from "styled-components";
import { media } from "../../../styles/media";

interface Props {
  index: 1 | 2 | 3 | 4 | 5 | 6;
  isLeft?: boolean;
}

function ManualBox({ index, isLeft }: Props) {
  const MANUAL = Object.freeze({
    "1": {
      title: "문제 제목",
      description: "제목에는 이 문제를 나타낼 수 있는 키워드를 입력해주세요.",
    },
    "2": {
      title: "문제 내용",
      description:
        "문제는 서술형으로 작성해주세요. 단, 문제의 정답을 작성할 때 놓치기 쉬운 포인트나, 근본적인 원인을 고려해서 문제를 푸는 사람들이깊게 문제를 풀 수 있도록 작성해주세요.",
    },
    "3": {
      title: "이미지 첨부",
      description:
        "문제 작성 시 필요한 도표나 그래프 등의 이미지 자료를 첨부해주세요.",
    },
    "4": { title: "문제 정답", description: "문제의 정답을 입력해주세요." },
    "5": {
      title: "문제 해설",
      description:
        "문제의 해설을 최대한 깊이 있게 입력해주세요. 해당 현상이 발생한 이유와 이 작업을 진행하기 위해 선행되어야 할 조건등을 포함하여 자세히 작성해주세요.",
    },
    "6": {
      title: "채점 기준",
      description:
        "부분점수를 지정할 수 있습니다. 가장 깊이 있게 작성한 경우 10점, 아무 깊이 없이 정답만 쓴 경우 0점 등 답변의 퀄리티에 차등을 만들어 주세요.",
    },
  });
  return (
    <Box isLeft={isLeft}>
      <NumberCircle>{index}</NumberCircle>
      <div>
        <Title>{MANUAL[index].title}</Title>
        <Description>{MANUAL[index].description}</Description>
      </div>
      <Tail isLeft={isLeft} />
    </Box>
  );
}

export default ManualBox;

const Box = styled.div<{ isLeft: boolean }>`
  display: grid;
  grid-template-columns: 30px 270px;
  gap: 16px;
  padding: 18px 16px;

  position: absolute;

  width: 350px;
  top: 30px;
  left: ${(p) => (p.isLeft ? "-405px" : "560px")};

  background: #1f2937;
  border-radius: 12px;

  ${media.medium`
    display: none;
  `}
`;

const NumberCircle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 30px;

  background: #6366f1;

  border-radius: 100%;

  color: #ffffff;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;

const Title = styled.h3`
  margin-bottom: 5px;

  font-weight: 700;
  font-size: 14px;
  line-height: 19px;

  color: #ffffff;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;

  color: #ffffff;
`;

const Tail = styled.span<{ isLeft: boolean }>`
  position: absolute;
  width: 0;
  height: 0;

  top: -8px;
  left: ${(p) => (p.isLeft ? "342px" : "-8px")};

  ${media.medium`
    top: 74px;
    right: 16px;
  `}

  border-bottom: 8px solid #1f2937;
  border-top: 8px solid #f8fafc;
  border-left: 8px solid #f8fafc;
  border-right: 8px solid #1f2937;

  transform: rotate(45deg);
`;
