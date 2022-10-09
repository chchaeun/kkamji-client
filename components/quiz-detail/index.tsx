import { useRouter } from "next/router";
import React from "react";
import { useQuizDetailQuery } from "../../api/quizzes/hooks";
import { QuizSummary } from "../../types/Quiz";
import HeadTitle from "../common/Title";
import QuizRate from "./blocks/QuizRate";
import QuizSolveForm from "./blocks/QuizSolveForm";
import QuizSolveView from "./blocks/QuizSolveView";
import QuizCommentContainer from "./containers/QuizCommentContainer";
import QuizDetailNav from "./containers/QuizDetailNav";

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
      <div className="absolute top-0 w-full h-screen pt-20 sm:h-full sm:mt-16 sm:pt-2">
        <div className="flex items-center justify-between w-1/2 px-20 py-5 sm:w-full sm:px-10">
          <div className="flex items-center gap-5 text-sm text-gray-700">
            <h2 className="text-2xl font-semibold">{quizDetail?.quizTitle}</h2>
            <span>작성자: {quizDetail?.writerName}</span>
          </div>
          <QuizRate quizId={quizId} />
        </div>
        <div className="grid grid-cols-2 gap-10 px-20 h-[79%] sm:flex sm:flex-col sm:h-fit sm:px-10 sm:pb-20">
          <div className="h-full pb-2 pr-10 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 sm:pr-0">
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
    </>
  );
}

export default QuizDetailTemplate;
