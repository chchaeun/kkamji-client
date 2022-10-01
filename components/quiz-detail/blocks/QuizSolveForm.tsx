import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateQuizIsSolved } from "../../../api/quizzes/quiz-solve";

interface Props {
  quizId: string;
}

type SolveValidForm = {
  solve: string;
};

function QuizSolveForm({ quizId }: Props) {
  const queryClient = useQueryClient();

  const {
    register: solveRegister,
    handleSubmit: handleSolveSubmit,
    formState: { errors: solveErrors },
  } = useForm<SolveValidForm>();

  const { mutate: mutateQuizIsSolved } = useMutation(
    (answer: string) => updateQuizIsSolved({ quizId, answer }),
    {
      mutationKey: ["quizIsSolved", quizId],
      onSuccess: () => {
        queryClient.invalidateQueries(["quizDetail", quizId]);
      },
      onError: (err) => {},
    }
  );

  const onSolveValid: SubmitHandler<SolveValidForm> = ({ solve }) => {
    mutateQuizIsSolved(solve);
  };
  return (
    <form
      onSubmit={handleSolveSubmit(onSolveValid)}
      className="flex flex-col gap-8 pb-10 items-end"
    >
      <div className="flex flex-col w-full gap-2">
        <label className="text-xl">
          정답 입력
          <textarea
            {...solveRegister("solve", { required: true })}
            className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        {solveErrors.solve && solveErrors.solve.type === "required" && (
          <em>답은 필수 입력값입니다.</em>
        )}
      </div>

      <button
        type="submit"
        className="w-fit bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >
        제출
      </button>
    </form>
  );
}

export default QuizSolveForm;
