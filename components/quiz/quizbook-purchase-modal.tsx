import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { IQuizbook } from "../../api/quiz/quizbooks";
import { IUserInfo } from "../../api/user/user-info";

function QuizBookPurchaseModal({ props }: { props: IQuizbook }) {
  const {
    quizPackageID,
    quizPackageCost,
    quizNum,
    choiceQuizNum,
    shortQuizNum,
    longQuizNum,
    keywords,
  } = props;

  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData<IUserInfo>(["userInfo"]);
  const tag = (content: string) => {
    return <span>{content}</span>;
  };
  const quizTypes = [
    { type: "객관식", count: choiceQuizNum },
    { type: "주관식", count: shortQuizNum },
    { type: "서술형", count: longQuizNum },
  ];
  return (
    <div>
      <div>
        <span>
          <h2>문제집 #{quizPackageID}</h2>
          <span>
            {quizPackageCost} 샤프심 (보유: {userInfo?.point})
          </span>
        </span>
        <button>X</button>
      </div>
      <div>
        <h4>문제 총 {quizNum}개</h4>
        <div>
          {quizTypes.map((quizType) => (
            <span key={quizType.type}>
              {tag(`${quizType.type} ${quizType.count}`)}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4>키워드</h4>
        <div>
          {keywords.map((keyword, idx) => (
            <span key={idx}>{tag(keyword)}</span>
          ))}
        </div>
      </div>
      <button>구매하기</button>
    </div>
  );
}

export default QuizBookPurchaseModal;
