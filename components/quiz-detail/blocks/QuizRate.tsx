import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateQuizRate } from "../../../api/quizzes/quiz-rate";
import useQuizDetailQuery from "../../../hooks/quiz-detail";
import { QuizDetailSelect } from "../../../types/Quiz";
interface Props {
  quizId: string;
}
interface QuizRate {
  rate: "GOOD" | "BAD" | null;
}
function QuizRate({ quizId }: Props) {
  const queryClient = useQueryClient();
  const { data: quizDetail } = useQuizDetailQuery();
  const { mutate: mutateQuizRate } = useMutation(
    ({ rate }: QuizRate) => updateQuizRate({ quizId: quizId, rate }),
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries(["quizDetail", quizId]);

        const previousQuizDetail = queryClient.getQueryData<QuizDetailSelect>([
          "quizDetail",
          quizId,
        ]);

        if (previousQuizDetail) {
          queryClient.setQueryData<QuizDetailSelect>(["quizDetail", quizId], {
            ...previousQuizDetail,
            didIRate: data.rate,
            cntOfGood:
              previousQuizDetail.didIRate === "GOOD"
                ? previousQuizDetail.cntOfGood - 1
                : data.rate === "GOOD"
                ? previousQuizDetail.cntOfGood + 1
                : previousQuizDetail.cntOfGood,
          });
        }

        return { previousQuizDetail };
      },
      onError: (err, newQuizDetail, context) => {
        queryClient.setQueryData(["quizDetail", quizId], quizDetail);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["quizDetail", quizId]);
      },
    }
  );

  const onRateClick = ({ rate }: QuizRate) => {
    mutateQuizRate({ rate });
  };

  return (
    <div className="flex items-start gap-4">
      <span className="flex items-center gap-1">
        {quizDetail?.didIRate === "GOOD" ? (
          <button onClick={() => onRateClick({ rate: null })}>
            <Icon icon="icon-park-solid:good-two" height={22} />
          </button>
        ) : (
          <button onClick={() => onRateClick({ rate: "GOOD" })}>
            <Icon icon="icon-park-outline:good-two" height={22} />
          </button>
        )}
        <span className="text-sm">
          {quizDetail?.cntOfGood ? quizDetail?.cntOfGood : 0}
        </span>
      </span>
      {quizDetail?.didIRate === "BAD" ? (
        <button onClick={() => onRateClick({ rate: null })} className="pt-1">
          <Icon icon="icon-park-solid:bad-two" height={22} />
        </button>
      ) : (
        <button onClick={() => onRateClick({ rate: "BAD" })} className="pt-1">
          <Icon icon="icon-park-outline:bad-two" height={22} />
        </button>
      )}
    </div>
  );
}

export default QuizRate;
