import { Icon } from "@iconify/react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { updateQuizRate } from "../../../api/quizzes";
import { useQuizDetailQuery } from "../../../api/quizzes/hooks";
import { QuizDetailSelect } from "../../../types/Quiz";

interface Props {
  quizId: string;
}
interface QuizRate {
  rate: "GOOD" | "BAD" | null;
}
function QuizRate({ quizId }: Props) {
  const queryClient = new QueryClient();

  const { data: quizDetail } = useQuizDetailQuery({ quizId });

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
        window.location.reload();
      },
    }
  );

  const onRateClick = ({ rate }: QuizRate) => {
    mutateQuizRate({ rate });
  };

  return (
    <>
      <Block>
        {quizDetail?.didIRate === "GOOD" ? (
          <button onClick={() => onRateClick({ rate: null })}>
            <Icon
              icon="heroicons-solid:thumb-up"
              color={"#4F46E5"}
              fontSize={16}
            />
          </button>
        ) : (
          <button onClick={() => onRateClick({ rate: "GOOD" })}>
            <Icon
              icon="heroicons-solid:thumb-up"
              color={"#6B7280"}
              fontSize={16}
            />
          </button>
        )}
        <Number didIRate={quizDetail?.didIRate || null}>
          {quizDetail?.cntOfGood ? quizDetail?.cntOfGood : 0}
        </Number>
      </Block>
      {quizDetail?.didIRate === "BAD" ? (
        <button onClick={() => onRateClick({ rate: null })}>
          <Icon
            icon="heroicons-solid:thumb-down"
            color={"#EF4444"}
            fontSize={16}
          />
        </button>
      ) : (
        <button onClick={() => onRateClick({ rate: "BAD" })}>
          <Icon
            icon="heroicons-solid:thumb-down"
            color={"#6B7280"}
            fontSize={16}
          />
        </button>
      )}
    </>
  );
}

export default QuizRate;

const Block = styled.span`
  display: flex;
  gap: 5px;
`;

const Number = styled.span<{ didIRate: "GOOD" | "BAD" | null }>`
  color: ${(p) => p.didIRate === "GOOD" && "#4F46E5"};
`;
