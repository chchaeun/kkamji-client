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
    quizbookId,
    quizbookTitle,
    quizbookDescription,
    numOfQuizzes,
    quizbookWeek,
    submitUserName,
  } = props;

  const tag = (content: string) => {
    return (
      <span className="p-1 px-2 rounded-2xl text-xs bg-indigo-200">
        {content}
      </span>
    );
  };
  return (
    <section
      onClick={onClick}
      className="flex flex-col gap-4 justify-between bg-white p-5 drop-shadow-md hover:drop-shadow-xl cursor-pointer"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{quizbookTitle}</h2>
        <p className="text-gray-700">{quizbookDescription}</p>
      </div>
      <div className="flex gap-3">
        <span>
          <span className="font-semibold">💁 출제자</span> {submitUserName}
        </span>
        <span>
          <span className="font-semibold">✍️ 문제 수</span> {numOfQuizzes}
        </span>
      </div>
    </section>
  );
}

export default Quizbook;
