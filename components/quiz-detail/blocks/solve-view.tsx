import { useRouter } from "next/router";
import React, { useState } from "react";
import { QuizDetailSelect } from "../../../types/Quiz";
import SolveRubric from "./solve-rubric";
interface Props {
  challengeId: string;
  quizId: string;
  quizDetail: QuizDetailSelect;
}
function QuizSolveView({ challengeId, quizId, quizDetail }: Props) {
  const router = useRouter();

  const {
    solveAnswer,
    isMine,
    quizAnswer,
    quizExplanation,
    solveScore,
    quizRubric,
  } = quizDetail;

  const [showAnswer, setShowAnswer] = useState(false);

  const onAnswerClick = () => {
    if (solveAnswer) {
      setShowAnswer((prev) => !prev);
    } else {
      alert("정답을 제출해야 열람할 수 있습니다.");
    }
  };

  const onEditClick = () => {
    router.push(`/challenges/${challengeId}/quizzes/${quizId}/edit`);
  };

  const contentsFormat = (contents: string) => {
    return (
      <p>
        {contents
          .replaceAll("\t", "\u00a0 \u00a0 \u00a0 \u00a0")
          .replaceAll("\\t", "\u00a0 \u00a0 \u00a0 \u00a0")
          .split("\n")
          .map((content) => (
            <>
              {content}
              <br />
            </>
          ))}
      </p>
    );
  };
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl">정답</h2>
        <div className="flex gap-2">
          {isMine && (
            <button onClick={onEditClick} className="text-gray-700 underline">
              수정
            </button>
          )}
          <button
            type="button"
            onClick={onAnswerClick}
            className="text-gray-700 underline"
          >
            {showAnswer ? "닫기" : "열기"}
          </button>
        </div>
      </div>
      {showAnswer && (
        <>
          <p className="flex justify-between p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
            {quizAnswer && contentsFormat(quizAnswer)}
          </p>
          <div className="flex flex-col items-end gap-5">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-xl">해설</h2>
              <div className="p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                {quizExplanation && contentsFormat(quizExplanation)}
              </div>
            </div>
            <SolveRubric
              quizId={quizId}
              solveScore={solveScore}
              rubricList={quizRubric}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default QuizSolveView;
