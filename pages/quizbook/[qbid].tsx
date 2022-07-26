import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import {
  fetchQuizbookDetail,
  IQuizbookDetail,
} from "../../api/quiz/fetch-quizbook-detail";

function QuizbookDetail() {
  const router = useRouter();

  const { query } = router;

  const { data: quizbookDetail } = useQuery<IQuizbookDetail[]>(
    ["quizbookDetail"],
    fetchQuizbookDetail
  );

  const onQuizClick = (quizID: string) => {
    router.push(`/quizbook/${quizID}`);
  };

  const getQuizType = (quizType: string) => {
    if (quizType === "SINGLE_CHOICE") {
      return "객관식";
    } else if (quizType === "SHORT_ANSWER") {
      return "주관식";
    } else {
      return "서술형";
    }
  };

  return (
    <div>
      <div>
        <h1>문제집 #{query.qbid}</h1>
        <span>문제 총 {quizbookDetail?.length}개</span>
      </div>
      <div>
        {quizbookDetail?.map((quiz) => (
          <div
            key={quiz.quizID}
            onClick={() => onQuizClick(String(quiz.quizID))}
          >
            <div>
              <span>Q{quiz?.quizID}</span>
              <span>{quiz.quizContent}</span>
            </div>
            <span>{getQuizType(quiz.quizType)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizbookDetail;
