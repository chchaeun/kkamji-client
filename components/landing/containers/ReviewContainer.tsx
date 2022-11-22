import React from "react";
import styled from "styled-components";
import { media } from "../../../styles/media";
import { Br, Title } from "../styles";

function ReviewContainer() {
  return (
    <Container>
      <Title color="#ffffff">
        깜지를 경험한 학생들의 <Br />
        따끈따끈한 후기!
      </Title>
      <Blocks>
        <Block>
          <img src="image/landing/profile1.png" />
          <span>
            깜지를 통해 퀴즈를 만들면서 중요하게 생각되는 부분을 한번 더 짚어볼
            수 있었고, 부족한 부분을 다시 생각하는 계기가 되었습니다~!!
          </span>
        </Block>
        <Block>
          <img src="image/landing/profile2.png" />
          <span>
            배운 내용을 복습하고 응용문제를 만들기 위해 고민하는 과정이 개념을
            완전히 습득하는데 도움이 되었습니다.
          </span>
        </Block>
        <Block>
          <img src="image/landing/profile3.png" />
          <span>
            생각보다 기대 이상인 퀄리티의 문제들을 통해 더 많이 학습할 수
            있었습니다!!
          </span>
        </Block>
        <Block>
          <img src="image/landing/profile4.png" />
          <span>
            잘못 생각하고 있었던 부분을 바로잡을 수 있으며, 확실한 내용도 한번
            더 확인할 수 있었습니다ㅎㅎ 오픈북에 자발적으로 문제를 풀어보는거라
            부담 없이 공부할 수 있었고 개념을 확인하는 좋은 기회가 되었습니다!!
          </span>
        </Block>
      </Blocks>
    </Container>
  );
}

export default ReviewContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 54px 330px;
  gap: 24px;

  background: #06b6d4;

  ${media.medium`
    padding: 54px 20px;
  `}
`;

const Blocks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  gap: 16px;

  width: 548px;

  background: #ffffff;
  border-radius: 12px;

  font-weight: 700;
  font-size: 16px;
  line-height: 150%;

  color: #1e293b;

  ${media.medium`
    width: 100%;
  `}

  img {
    width: 32px;
    height: 32px;
  }
`;
