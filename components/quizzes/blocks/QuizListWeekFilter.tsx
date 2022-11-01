import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useCurrentWeekQuery } from "../../../api/challenges/hooks";
import { media } from "../../../styles/media";
import { currentPageState } from "../stores/currentPage";
import { weekSelectState } from "../stores/weekFilter";
interface Props {
  challengeId: string;
}
function WeekFilter({ challengeId }: Props) {
  const [selected, setSelected] = useRecoilState<boolean[]>(weekSelectState);
  const [, setCurrentPage] = useRecoilState<number>(currentPageState);

  const { data: currentWeek } = useCurrentWeekQuery({ challengeId });

  useEffect(() => {
    setAllWeek(true);
  }, [currentWeek]);

  // 열람 가능한 모든 주차를 가져오는 함수
  const setAllWeek = (temp: boolean) => {
    switch (temp) {
      case true:
        if (currentWeek) {
          const allWeek = Array(currentWeek).fill(true);
          setSelected(allWeek);
        }
        break;
      case false:
        const allWeek = Array(currentWeek).fill(false);

        setSelected(allWeek);
        break;
    }
    setCurrentPage(0);
  };

  const onWeekClick = (week: number) => {
    let newSelected = [...selected];

    newSelected[week] = !newSelected[week];

    setSelected(newSelected);

    setCurrentPage(0);
  };

  return (
    <Container>
      <Header>
        <Title>주차별 보기</Title>
        <Button onClick={() => setAllWeek(true)}>전체선택</Button>
        <Button onClick={() => setAllWeek(false)}>전체해제</Button>
      </Header>
      <Block>
        {selected.map((value, index) => (
          <>
            {value && (
              <ToggleButton
                key={index}
                onClick={() => onWeekClick(index)}
                toggle={true}
              >
                {index + 1}주차
              </ToggleButton>
            )}
          </>
        ))}
        {selected.map((value, index) => (
          <>
            {!value && (
              <ToggleButton
                key={index}
                onClick={() => onWeekClick(index)}
                toggle={false}
              >
                {index + 1}주차
              </ToggleButton>
            )}
          </>
        ))}
      </Block>
    </Container>
  );
}

export default WeekFilter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Header = styled.div`
  display: flex;
  gap: 12px;
`;
const Title = styled.h2`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #111827;
`;

const Button = styled.button`
  font-weight: 700;
  font-size: 14px;

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;

  color: #4f46e5;
`;

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  ${media.medium`
    flex-wrap: nowrap;
    flex-direction:row;
    overflow-x: scroll;
    
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none !important;
    }
  `}
`;
const ToggleButton = styled.button<{ toggle: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;

  background: ${(p) => (p.toggle ? "#eef2ff" : "#F9FAFB")};
  border-radius: 12px;

  white-space: nowrap;

  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  color: ${(p) => (p.toggle ? "#4f46e5" : "#9CA3AF")};

  &:hover {
    background: ${(p) => (p.toggle ? "#C7D2FE" : "#E5E7EB")};
  }
`;
