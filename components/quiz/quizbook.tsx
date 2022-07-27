import React from "react";
import { IQuizbook } from "../../api/quiz/quizbooks";

function Quizbook({
  props,
  onClick,
}: {
  props: IQuizbook;
  onClick: React.MouseEventHandler;
}) {
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
    return (
      <span className="p-1 px-2 rounded-2xl text-xs bg-indigo-200 cursor-pointer transition ease-in-out duration-200">
        {content}
      </span>
    );
  };

  const quizTypes = [
    { type: "객관식", count: choiceQuizNum },
    { type: "주관식", count: shortQuizNum },
    { type: "서술형", count: longQuizNum },
  ];

  return (
    <section
      onClick={onClick}
      className="flex flex-col gap-2 bg-white p-5 drop-shadow-md hover:drop-shadow-xl cursor-pointer"
    >
      <div className="flex justify-between">
        <h2 className="text-xl">#{quizPackageID}</h2>
        <span className="text-sm text-gray-700">
          {quizPackageCost
            ? isOwned
              ? "보유함"
              : `${quizPackageCost} 샤프심`
            : "무료"}
        </span>
      </div>
      <div>
        <h4>문제 총 {quizNum}개</h4>
        <div className="flex gap-1">
          {quizTypes.map((quizType) => (
            <span key={quizType.type}>
              {tag(`${quizType.type} ${quizType.count}`)}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4>키워드</h4>
        <div className="flex flex-wrap gap-1">
          {keywords.map((keyword, idx) => (
            <span key={idx}>{tag(keyword)}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Quizbook;
