import React from "react";
import { IQuizBook } from "../../api/quiz/fetch-quizbooks";

function QuizBook(props: IQuizBook) {
  const {
    quizPackageID,
    quizPackageCost,
    isOwned,
    quizNum,
    choiceQuizNum,
    shortQuizNum,
    longQuizNum,
    keywords,
  } = props;

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
        <h2>#{quizPackageID}</h2>
        <span>
          {quizPackageCost
            ? isOwned
              ? "보유함"
              : `${quizPackageCost} 샤프심`
            : "무료"}
        </span>
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
    </div>
  );
}

export default QuizBook;
