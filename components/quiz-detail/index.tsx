import { useRouter } from "next/router";
import React from "react";
import useQuizDetailQuery from "../../hooks/quiz-detail";
import { QuizSummary } from "../../types/Quiz";
import QuizRate from "./blocks/rate";
import QuizSolveForm from "./blocks/solve-form";
import QuizSolveView from "./blocks/solve-view";
import QuizCommentContainer from "./containers/comment-container";
import QuizDetailNav from "./containers/nav";

interface Props {
  quizzes: QuizSummary[];
  page: "READABLE" | "MY" | "LIKED";
}

function QuizDetailTemplate({ quizzes, page }: Props) {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const quizId = String(router.query.qid);

  const { data: quizDetail, error } = useQuizDetailQuery();

  if (error) {
    if (error?.response?.status === 404) {
      return (
        <div className="flex w-full h-screen items-center justify-center">
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
    <div className="absolute top-0 w-full h-screen pt-20 sm:h-full sm:mt-16 sm:pt-2">
      <div className="flex justify-between items-center w-1/2 py-5 px-20 sm:w-full sm:px-10">
        <div className="flex gap-5 items-center text-gray-700 text-sm">
          <h2 className="font-semibold text-2xl">{quizDetail?.quizTitle}</h2>
          <span>작성자: {quizDetail?.writerName}</span>
        </div>
        <QuizRate quizId={quizId} />
      </div>
      <div className="grid grid-cols-2 gap-10 px-20 h-[79%] sm:flex sm:flex-col sm:h-fit sm:px-10 sm:pb-20">
        <div className="h-full pr-10 pb-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 sm:pr-0">
          <div className="flex flex-col gap-10">
            <p className="flex flex-col gap-5 justify-between p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
              {quizDetail && contentsFormat(quizDetail?.quizContent)}
              {quizDetail?.quizFiles.map((quizFile) => (
                <img key={quizFile.id} src={quizFile.qfPath} width={500} />
              ))}
            </p>

            {quizDetail?.solveAnswer && (
              <div className="flex flex-col gap-3">
                <h2 className="text-xl">내 정답</h2>
                <div className="p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                  {quizDetail?.solveAnswer &&
                    contentsFormat(quizDetail?.solveAnswer)}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-full pr-10 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 sm:pr-0 sm:pb-10">
          <div className="flex flex-col gap-5">
            {!quizDetail?.solveAnswer && <QuizSolveForm quizId={quizId} />}
            {quizDetail && (
              <QuizSolveView
                challengeId={challengeId}
                quizId={quizId}
                quizDetail={quizDetail}
              />
            )}
            <QuizCommentContainer quizId={quizId} />
          </div>
        </div>
      </div>
      <QuizDetailNav
        page={page}
        challengeId={challengeId}
        quizId={quizId}
        quizzes={quizzes}
      />
    </div>
  );
}

export default QuizDetailTemplate;
