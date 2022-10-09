import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useChallengeDetailQuery } from "../../../../../api/challenges/hooks";
import api from "../../../../../api/my-api";
import { fetchMyQuizDetail } from "../../../../../api/quizzes";
import { useQuizzesQuery } from "../../../../../api/quizzes/hooks";
import HeadTitle from "../../../../../components/common/Title";
import QuizCommentContainer from "../../../../../components/quiz-detail/containers/QuizCommentContainer";
import QuizDetailNav from "../../../../../components/quiz-detail/containers/QuizDetailNav";
import { MyQuizDetail, MyQuizDetailSelect } from "../../../../../types/Quiz";

function QuizDetailPage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);
  const quizId = String(router.query.qid);
  const { data: quizDetail, error } = useQuery<
    MyQuizDetail,
    AxiosError,
    MyQuizDetailSelect
  >(["myQuizDetail", quizId], () => fetchMyQuizDetail({ quizId }), {
    enabled: !!router.query.qid,
    onError: (err) => {},
    select: (data) => {
      return { ...data, quizRubric: JSON.parse(data.quizRubric) };
    },
  });

  const { data: myQuizzes } = useQuizzesQuery({
    challengeId,
    page: "MY",
  });

  const { data: challengeDetail, error: challengeError } =
    useChallengeDetailQuery({ challengeId });
  if (challengeError || challengeDetail?.applicationStatus !== "ACCEPTED") {
    return <div>없는 페이지입니다.</div>;
  }

  if (error) {
    if (error?.response?.status === 404) {
      return (
        <div className="flex items-center justify-center w-full h-screen">
          존재하지 않는 페이지입니다.
        </div>
      );
    }
  }
  const onEditClick = () => {
    router.push(`/challenges/${challengeId}/quizzes/${quizId}/edit`);
  };

  const contentsFormat = (contents: string) => {
    return (
      <p>
        {contents
          .replaceAll("\t", "\u00a0 \u00a0 \u00a0 \u00a0")
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
          <div className="flex items-start gap-4">
            <span className="flex items-center gap-1">
              <Icon icon="icon-park-solid:good-two" height={22} />
              <span className="text-sm">
                {quizDetail?.cntOfGood ? quizDetail?.cntOfGood : 0}
              </span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 px-20 h-[79%] sm:flex sm:flex-col sm:h-fit sm:px-10 sm:pb-20">
          <div className="h-full pb-2 pr-10 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 sm:pr-0">
            <div className="flex flex-col gap-10">
              <p className="flex flex-col gap-5 justify-between p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                {quizDetail?.quizContent &&
                  contentsFormat(quizDetail?.quizContent)}
                {quizDetail?.quizFiles.map((quizFile) => (
                  <img key={quizFile.id} src={quizFile.qfPath} width={500} />
                ))}
              </p>
            </div>
          </div>
          <div className="h-full pr-10 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 sm:pr-0 sm:pb-10">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <h2 className="text-xl">정답</h2>
                <div className="flex gap-2">
                  <button
                    onClick={onEditClick}
                    className="text-gray-700 underline"
                  >
                    수정
                  </button>
                </div>
              </div>
              <>
                <p className="flex justify-between p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                  {quizDetail?.quizAnswer &&
                    contentsFormat(quizDetail?.quizAnswer)}
                </p>
                <div className="flex flex-col items-end gap-5">
                  <div className="flex flex-col w-full gap-3">
                    <h2 className="text-xl">해설</h2>
                    <div className="p-5 bg-white rounded-lg shadow-sm border-[1px] border-gray-300">
                      {quizDetail?.quizExplanation &&
                        contentsFormat(quizDetail?.quizExplanation)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-5">
                  <div className="flex flex-col w-full gap-3">
                    <h2 className="text-xl">채점 기준</h2>
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="w-2 bg-gray-200">점수</th>
                          <th className="bg-gray-200">내용</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quizDetail?.quizRubric.map((rubric, index) => (
                          <tr key={index}>
                            <td>{rubric.score}</td>
                            <td>{rubric.content}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
              <QuizCommentContainer quizId={quizId} />
            </div>
          </div>
        </div>
        {myQuizzes && (
          <QuizDetailNav
            page={"MY"}
            challengeId={challengeId}
            quizId={quizId}
            quizzes={myQuizzes}
          />
        )}
      </div>
    </>
  );
}

export default QuizDetailPage;
