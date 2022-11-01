import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { getJwtToken } from "../../../api/getJwtToken";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { fetchQuizSubmitStackedCount } from "../../../api/quizzes";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

interface Data {
  labels: number[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
    stepped: boolean;
    backgroundColor: string;
  }[];
}
interface Options {
  responsive: boolean;
  maintainAspectRatio: boolean;
  scales: {
    yAxes: {
      ticks: {
        color: string[];
      };
      grid: {
        color: string[];
      };
    };
    xAxes: {
      ticks: {
        color: string[];
      };
      grid: {
        display: boolean;
        lineWidth: number[];
        color: string[];
      };
    };
  };
  plugins: {
    title: {
      display: boolean;
      text: string;
    };
  };
  elements: {
    line: {
      borderWidth: number;
    };
  };
}

function MissionStackedCountChart() {
  const [data, setData] = useState<Data>();
  const [options, setOptions] = useState<Options>();

  const { data: missionCount } = useQuery<
    { week: number; count: number }[],
    AxiosError,
    number[]
  >(["missionCount"], fetchQuizSubmitStackedCount, {
    enabled: !!getJwtToken(),
    suspense: true,
    select: (data) => data.map((value) => value.count),
  });

  useEffect(() => {
    if (!missionCount) {
      return;
    }
    const totalWeek = Array(15).fill(0);

    const line = totalWeek.map((value, index) => {
      if (index + 1 == missionCount.length) {
        return { width: 2, color: "#A5B4FC" };
      } else {
        return { width: 0, color: "#F9FAFB" };
      }
    });

    let sum = 0;
    let stackedCount = Array<number>();

    for (let i = 0; i < missionCount.length; i++) {
      sum += missionCount[i];
      stackedCount.push(sum);
    }

    setData({
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      datasets: [
        {
          label: "Dataset",
          data: stackedCount,
          borderColor: "black",
          fill: false,
          stepped: true,
          backgroundColor: "#F9FAFB",
        },
      ],
    });

    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: {
          ticks: {
            color: ["#9CA3AF"],
          },
          grid: {
            color: ["#E5E7EB"],
          },
        },
        xAxes: {
          ticks: {
            color: ["#9CA3AF"],
          },
          grid: {
            display: true,
            lineWidth: line?.map((value) => value.width),
            color: line?.map((value) => value.color),
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
    });
  }, [missionCount]);

  return (
    <>
      {" "}
      <YLabel>문제 제출 수</YLabel>
      {data && options && <Line data={data} options={options} />}
      <Label>주차</Label>
    </>
  );
}

export default MissionStackedCountChart;

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
