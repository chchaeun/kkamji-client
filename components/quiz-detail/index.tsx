import { useRouter } from "next/router";
import React from "react";
import { useQuizDetailQuery } from "../../api/quizzes/hooks";
import { QuizSummary } from "../../types/Quiz";
import HeadTitle from "../common/HeadTitle";
import QuizContentContainer from "./containers/QuizContentContainer";

interface Props {
  quizzes: QuizSummary[];
  page: "READABLE" | "MY" | "LIKED";
}

function QuizDetailTemplate({ quizzes, page }: Props) {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const quizId = String(router.query.qid);

  const { data: quizDetail, error } = useQuizDetailQuery({ quizId });

  if (error) {
    if (error?.response?.status === 404) {
      return (
        <div className="flex items-center justify-center w-full h-screen">
          존재하지 않는 페이지입니다.
        </div>
      );
    }
  }

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
    <>
      <HeadTitle name={`${quizDetail?.quizTitle} : 깜지 문제`} />
      <QuizContentContainer quizId={quizId} challengeId={challengeId} />
    </>
  );
}

export default QuizDetailTemplate;
