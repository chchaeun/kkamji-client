import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { updateQuizScore } from "../../../api/quizzes/quiz-grade";
interface Props {
  quizId: string;
  solveScore: number | null;
  rubricList: {
    score: number;
    content: string;
  }[];
}
function QuizSolveRubric({ quizId, solveScore, rubricList }: Props) {
  const queryClient = useQueryClient();
  const [rubricScore, setRubricScore] = useState<number>();

  const { mutate: mutateQuizGrade } = useMutation(
    (score: number) => updateQuizScore({ quizId, score }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quizDetail", quizId]);
      },
      onError: (err) => {},
    }
  );
  const onRubricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setRubricScore(Number(value));
  };

  const onGradeClick = () => {
    if (!rubricScore) {
      return;
    }
    mutateQuizGrade(rubricScore);
  };
  return (
    <div className="w-full flex flex-col gap-3 items-end mb-10">
      {solveScore ? (
        <>
          <h2 className="w-full text-xl">채점 결과</h2>
          <div className="w-full p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
            {solveScore} 점
          </div>
        </>
      ) : (
        <>
          <h2 className="w-full text-xl">채점하기</h2>
          {rubricList?.map((rubric, index) => (
            <div
              key={index}
              className="flex items-center w-full pl-4 bg-white rounded-lg shadow-sm border-[1px] border-gray-300"
            >
              <input
                id={`bordered-radio-${index}`}
                type="radio"
                value={rubric.score}
                name="bordered-radio"
                className="w-4 h-4 text-[#5c3cde] bg-gray-100 border-gray-700"
                onChange={onRubricChange}
              />
              <label
                htmlFor={`bordered-radio-${index}`}
                className="flex justify-between pr-3 py-4 ml-2 w-full text-sm font-medium text-gray-900"
              >
                <span>{rubric.content}</span>
                <span>{rubric.score}점</span>
              </label>
            </div>
          ))}
          <button
            onClick={onGradeClick}
            className="bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            등록
          </button>
        </>
      )}
    </div>
  );
}

export default QuizSolveRubric;
