import React from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import styled from "styled-components";
import { media } from "../../../styles/media";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function MissionSteppedLineChart() {
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    datasets: [
      {
        label: "Dataset",
        data: [2, 4, 6, 8, 10, 12],
        borderColor: "black",
        fill: false,
        stepped: true,
        backgroundColor: "#F9FAFB",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: {
        max: 18,
        ticks: {
          color: ["#9CA3AF"],
        },
        grid: {
          color: ["#F3F4F6", "#E5E7EB"],
        },
      },
      xAxes: {
        ticks: {
          color: ["#9CA3AF"],
        },
        grid: {
          display: true,
          lineWidth: [0, 0, 0, 0, 0, 2, 0, 0, 0],
          color: [
            "#F9FAFB",
            "#F9FAFB",
            "#F9FAFB",
            "#F9FAFB",
            "#F9FAFB",
            "#A5B4FC",
            "#F9FAFB",
            "#F9FAFB",
            "#F9FAFB",
            "#F9FAFB",
            "#F9FAFB",
          ],
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "문제 제출 현황",
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };
  return (
    <Container>
      <Title>누적 문제 제출 현황</Title>
      <YLabel>문제 제출 수</YLabel>
      <Line data={data} options={options} />
      <Label>주차</Label>
    </Container>
  );
}

export default MissionSteppedLineChart;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  width: 100%;
  height: 275px;
  padding: 20px 24px 80px;

  background: rgb(249, 250, 251);
  border-radius: 8px;

  ${media.medium`
    height: 234px;
  `}
`;

const Title = styled.h2`
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  color: #111827;
`;

const Label = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  text-align: center;

  color: #9ca3af;
`;

const YLabel = styled(Label)`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;
