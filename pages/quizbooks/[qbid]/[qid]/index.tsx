import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchQuizAnswer, IQuizAnswer } from "../../../../api/quiz/quiz-answer";
import { fetchQuizDetail, IQuizDetail } from "../../../../api/quiz/quiz-detail";
import {
  fetchQuizIsSolved,
  IQuizIsSolved,
  updateQuizIsSolved,
} from "../../../../api/quiz/quiz-is-solved";
import SideNav from "../../../../components/layout/side-nav";
import { classNames } from "../../../../styles/classname-maker";

interface INavElements {
  link: string;
  name: string;
}

const navTitleA = {
  name: "3주차 문제집 A",
  link: "/quizbooks/13",
};
const navElementsNameA = [
  "데이터의 신뢰성",
  "FitIm",
  "ANOVA",
  "데이터의 신뢰성",
  "ANOVA",
  "Box plot",
  "Box plot",
  "Box plot",
  "Box plot",
  "선형 회귀",
];
const navElementsIdA = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const navTitleB = {
  name: "3주차 문제집 B",
  link: "/quizbooks/14",
};
const navElementsNameB = [
  "Normality test",
  "Equality Variance test",
  "선형 회귀 모델 작성",
  "선형 회귀식",
  "ANOVA",
  "선형회귀식",
  "ANOVA",
  "ANOVA",
  "Box Plot",
  "ANOVA",
];
const navElementsIdB = [20, 21, 22, 23, 24, 25, 36, 37, 38, 39];

const navTitleC = {
  name: "3주차 문제집 C",
  link: "/quizbooks/15",
};
const navElementsNameC = [
  "ANOVA",
  "ANOVA-treatment",
  "two way ANOVA",
  "one way ANOVA(일원분산분석)",
  "ANOVA-effect에 관한 이론",
  "two way ANOVA",
  "ANOVA 기본개념 체크",
  "회기분석과 분산분석 차이",
  "분산의 동질성 검정",
];
const navElementsIdC = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const navTitleD = {
  name: "3주차 문제집 D",
  link: "/quizbooks/16",
};
const navElementsNameD = [
  "factor",
  "interaction",
  "영향을 주는 factor",
  "측정에서의 반복, 재현성",
  "ANOVA 하기 위한 조건",
  "equal variance test",
  "ANOVA의 조건",
  "데이터 신뢰성",
  "factor 간의 상관관계",
  "선형식",
];
const navElementsIdD = [26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

const navTitle4A = {
  name: "4주차 문제집 A",
  link: "/quizbooks/17",
};
const navElementsName4A = [
  "Table Size",
  "배열에서 데이터 수정",
  "간단한 함수 계산하기",
  "원하는 데이터 배열 가공하기",
  "외부데이터",
  "NaN",
  "Table Size",
  "함수 reshape",
  "매트랩에서 윗 방향키의 역할",
  "함수 repmat",
];
const navElementsId4A = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49];

const navTitle4B = {
  name: "4주차 문제집 B",
  link: "/quizbooks/18",
};
const navElementsName4B = [
  "MATLAB 기본 조작",
  "MATLAB 기본 조작",
  "MATLAB 외부파일 가져오기",
  "ttest",
  "MATLAB 기본 조작",
  "MATLAB 기본 조작",
  "MATLAB 기본 조작",
  "MATLAB 기본 조작",
  "MATLAB 기본 조작",
  "MATLAB 기본 조작",
];
const navElementsId4B = [60, 61, 66, 70, 71, 72, 75, 76, 77, 78];

const navTitle4C = {
  name: "4주차 문제집 C",
  link: "/quizbooks/19",
};
const navElementsName4C = [
  "행벡터",
  "MATLAB 작업공간변수",
  "MATLAB함수 호출",
  "매트랩 표현 방식",
  "MATLAB 기본언어",
  "루프와 조건문",
  "plot함수",
  "행렬연산언어",
  "집합 함수",
  "명령함수",
];
const navElementsId4C = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59];

const navTitle4D = {
  name: "4주차 문제집 D",
  link: "/quizbooks/20",
};
const navElementsName4D = [
  "MATLAB 기본 이용",
  "식의 작성",
  "식의 작성 2",
  "배열의 저장",
  "index 이용",
  "반복된 Table",
  "엑셀 불러오기",
  "table 변형",
  "ad_test",
];
const navElementsId4D = [62, 63, 64, 65, 67, 68, 69, 73, 74];

// export async function getStaticPaths(){

// }
// export async function getStaticProps(){

// }

function QuizDetailPage() {
  const [showAnswer, setShowAnswer] = useState(false);
  const router = useRouter();

  const [quizId, setQuizId] = useState(String(router.query.qid));

  const queryClient = useQueryClient();

  const [navTitle, setNavTitle] = useState<INavElements>();
  const [navElements, setNavElements] = useState<INavElements[]>();

  const { data: quizDetail, error } = useQuery<IQuizDetail, AxiosError>(
    ["quizDetail", quizId],
    () => fetchQuizDetail(quizId),
    { enabled: !!quizId }
  );

  const { data: quizIsSolved } = useQuery<IQuizIsSolved>(
    ["quizIsSolved", quizId],
    () => fetchQuizIsSolved(quizId),
    {
      enabled: !!quizId,
    }
  );

  const { data: quizAnswer } = useQuery<IQuizAnswer>(
    ["quizAnswer", quizId],
    () => fetchQuizAnswer(quizId),
    {
      enabled: !!quizId,
    }
  );

  const { mutate: mutateQuizIsSolved } = useMutation(
    (props: { quizId: string; isCorrect: boolean }) =>
      updateQuizIsSolved(props),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quizIsSolved", quizId]);
      },
    }
  );

  useEffect(() => {
    setQuizId(String(router.query.qid));
  }, [router]);

  useEffect(() => {
    let temp = [];
    if (quizDetail?.quizbookId === 13) {
      setNavTitle(navTitleA);
      for (let i = 0; i < navElementsNameA.length; i++) {
        temp.push({
          name: navElementsNameA[i],
          link: `/quizbooks/${router.query.qbid}/${navElementsIdA[i]}`,
        });
      }
    } else if (quizDetail?.quizbookId === 14) {
      setNavTitle(navTitleB);
      for (let i = 0; i < navElementsNameB.length; i++) {
        temp.push({
          name: navElementsNameB[i],
          link: `/quizbooks/${router.query.qbid}/${navElementsIdB[i]}`,
        });
      }
    } else if (quizDetail?.quizbookId === 15) {
      setNavTitle(navTitleC);
      for (let i = 0; i < navElementsNameC.length; i++) {
        temp.push({
          name: navElementsNameC[i],
          link: `/quizbooks/${router.query.qbid}/${navElementsIdC[i]}`,
        });
      }
    } else if (quizDetail?.quizbookId === 16) {
      setNavTitle(navTitleD);
      for (let i = 0; i < navElementsNameD.length; i++) {
        temp.push({
          name: navElementsNameD[i],
          link: `/quizbooks/${router.query.qbid}/${navElementsIdD[i]}`,
        });
      }
    } else if (quizDetail?.quizbookId === 17) {
      setNavTitle(navTitle4A);
      for (let i = 0; i < navElementsName4A.length; i++) {
        temp.push({
          name: navElementsName4A[i],
          link: `/quizbooks/${router.query.qbid}/${navElementsId4A[i]}`,
        });
      }
    } else if (quizDetail?.quizbookId === 18) {
      setNavTitle(navTitle4B);
      for (let i = 0; i < navElementsId4B.length; i++) {
        temp.push({
          name: navElementsName4B[i],
          link: `/quizbooks/${router.query.qbid}/${navElementsId4B[i]}`,
        });
      }
    } else if (quizDetail?.quizbookId === 19) {
      setNavTitle(navTitle4C);
      for (let i = 0; i < navElementsId4C.length; i++) {
        temp.push({
          name: navElementsName4C[i],
          link: `/quizbooks/${router.query.qbid}/${navElementsId4C[i]}`,
        });
      }
    } else if (quizDetail?.quizbookId === 20) {
      setNavTitle(navTitle4D);
      for (let i = 0; i < navElementsId4D.length; i++) {
        temp.push({
          name: navElementsName4D[i],
          link: `/quizbooks/${router.query.qbid}/${navElementsId4D[i]}`,
        });
      }
    }
    setNavElements(temp);
  }, [quizDetail?.quizbookId]);

  if (error) {
    if (error?.response?.status === 404) {
      return (
        <div className="flex w-full h-screen items-center justify-center">
          존재하지 않는 페이지입니다.
        </div>
      );
    }
  }

  const onAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const onSolvedClick = (isCorrect: boolean) => {
    const props = {
      quizId,
      isCorrect,
    };
    mutateQuizIsSolved(props);
  };

  const onMoveQuizClick = (move: string) => {
    if (!navElements) {
      return;
    }
    for (let i = 0; i < navElements.length; i++) {
      if (navElements[i].link === router.asPath) {
        if (move === "prev" && i - 1 >= 0) {
          setShowAnswer(false);

          router.push(navElements[i - 1].link);
        } else if (move === "next" && i + 1 < navElements.length) {
          setShowAnswer(false);

          router.push(navElements[i + 1].link);
        }
      }
    }
  };

  const isDisabled = (move: string) => {
    if (!navElements) {
      return;
    }
    for (let i = 0; i < navElements.length; i++) {
      if (navElements[i].link === router.asPath) {
        if (move === "prev" && i - 1 < 0) {
          return false;
        } else if (move === "next" && i + 1 >= navElements.length) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className="grid grid-cols-5 gap-4 w-full lg:mt-20 m-auto sm:flex sm:flex-col sm:px-10">
      <div
        onClick={() => setShowAnswer(false)}
        className="col-start-1 flex justify-center mt-10 sm:mt-0"
      >
        {navTitle && navElements && (
          <SideNav title={navTitle} elements={navElements} />
        )}
      </div>
      <div className="col-start-2 col-span-3 flex flex-col gap-8 py-10 sm:h-screen sm:justify-between sm:py-20">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl">{quizDetail?.quizTitle}</h2>
          <p className="flex flex-col gap-5 justify-between bg-white p-5 drop-shadow-md">
            {quizDetail?.quizContent.split("[img]")[0]}
            {quizDetail?.quizContent.split("[img]")[1] && (
              <img
                src={`http://drive.google.com/uc?export=download&id=${
                  quizDetail?.quizContent.split("[img]")[1].split("?id=")[1]
                }`}
                width="300"
                alt="문제 이미지"
              />
            )}
          </p>
          {!showAnswer && (
            <button
              onClick={onAnswerClick}
              className="m-auto bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              정답과 해설
            </button>
          )}
        </div>
        {showAnswer && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <h2 className="text-2xl">정답</h2>
                <button
                  onClick={onAnswerClick}
                  className="text-gray-700 underline"
                >
                  닫기
                </button>
              </div>
              <p className="flex items-center gap-5 justify-between bg-white p-5 drop-shadow-md">
                {quizAnswer?.quizAnswer}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl">해설</h2>
              <div className="flex flex-col gap-5 justify-between bg-white p-5 drop-shadow-md">
                {quizAnswer?.quizExplanation}
                {
                  <div className="px-3 bg-white border-l-4 border-indigo-400">
                    <h3 className="font-semibold">출처</h3>
                    <div className="overflow-scroll scrollbar-hide">
                      {quizAnswer?.quizSource ? quizAnswer?.quizSource : "없음"}
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        )}
        {showAnswer && !quizIsSolved?.quizIsSolved && (
          <div className="flex flex-col gap-2 items-center m-auto">
            <span className="flex gap-1">
              나는 이 문제를{" "}
              <button
                onClick={() => onSolvedClick(true)}
                className="py-1 px-3 rounded text-sm  bg-black text-white "
              >
                맞혔다
              </button>
              <button
                onClick={() => onSolvedClick(false)}
                className="py-1 px-3 rounded text-sm  bg-black text-white"
              >
                틀렸다
              </button>
            </span>
            <span className="text-sm text-gray-700 ">
              * 추후 오답노트 기능을 제공합니다
            </span>
          </div>
        )}
        <div className="flex justify-between sm:justify-end sm:gap-3">
          <button
            onClick={() => onMoveQuizClick("prev")}
            className={classNames(
              isDisabled("prev")
                ? "bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold focus:outline-none focus:shadow-outline cursor-pointer"
                : "bg-gray-200 text-gray-700 cursor-default",
              "py-2 px-4 mb-4 rounded"
            )}
          >
            이전
          </button>
          <button
            onClick={() => onMoveQuizClick("next")}
            className={classNames(
              isDisabled("next")
                ? "bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold focus:outline-none focus:shadow-outline cursor-pointer"
                : "bg-gray-200 text-gray-700 cursor-default",
              "py-2 px-4 mb-4 rounded"
            )}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizDetailPage;
