import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { postAnswerCheck } from "../../api/quiz/answer-check";
import { fetchQuizDetail, IQuizDetail } from "../../api/quiz/quiz-detail";

function QuizDetail() {
  const [showAnswer, setShowAnswer] = useState(false);

  const queryClient = useQueryClient();

  const { data: quizDetail } = useQuery<IQuizDetail>(
    ["quizDetail"],
    fetchQuizDetail
  );

  const { mutate: updateAnswerCheck } = useMutation(
    (isCorrect: boolean) => postAnswerCheck(isCorrect),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quizDetail"]);
      },
    }
  );

  const onAnswerClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const onButtonClick = (isCorrect: boolean) => {
    updateAnswerCheck(isCorrect);
  };

  const parseQuizContent = (
    quizType: string,
    quizContent: { example: string[] | null; problem: string }
  ) => {
    if (quizType === "SINGLE_CHOICE") {
      return (
        <div>
          {quizContent.problem}
          <div>
            {quizContent.example?.map((exam, idx) => (
              <span key={idx}>
                {idx + 1}. {exam}
              </span>
            ))}
          </div>
        </div>
      );
    } else {
      return quizContent.problem;
    }
  };

  const parseAnswer = (quizAnswer: string[]) => {
    if (quizAnswer.length > 1) {
      return (
        <ul>
          {quizAnswer.map((quizAnswer, idx) => (
            <li key={idx}>{quizAnswer}</li>
          ))}
        </ul>
      );
    } else {
      return quizAnswer[0];
    }
  };

  return (
    <div>
      <h3>문제집 #{quizDetail?.quizPacakageID}</h3>
      <h2>Q {quizDetail?.quizID}.</h2>
      <div>
        {quizDetail?.quizType &&
          parseQuizContent(quizDetail?.quizType, quizDetail?.quizContent)}
      </div>
      <button onClick={onAnswerClick}>정답 보기</button>
      {showAnswer && (
        <div>
          <div>
            <h2>A.</h2>
            <button onClick={onAnswerClick}>닫기</button>
          </div>
          <div>
            {quizDetail?.quizAnswers && parseAnswer(quizDetail?.quizAnswers)}
          </div>
        </div>
      )}
      {!quizDetail?.isSolved && (
        <div>
          <span>
            나는 이 문제를{" "}
            <button onClick={() => onButtonClick(true)}>맞혔다</button>
            <button onClick={() => onButtonClick(false)}>틀렸다</button>
          </span>
          <span>* 추후 오답노트 기능을 제공합니다</span>
        </div>
      )}
    </div>
  );
}

export default QuizDetail;
