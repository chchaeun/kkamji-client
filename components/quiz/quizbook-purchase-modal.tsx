import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { postQuizbookPurchase } from "../../api/quiz/quizbook-purchase";
import { IQuizbook } from "../../api/quiz/quizbooks";
import { IUserInfo } from "../../api/user/user-info";

function QuizBookPurchaseModal({
  props,
  onClick,
}: {
  props: IQuizbook;
  onClick: React.MouseEventHandler;
}) {
  const {
    quizPackageID,
    quizPackageCost,
    quizNum,
    choiceQuizNum,
    shortQuizNum,
    longQuizNum,
    keywords,
  } = props;

  const queryClient = useQueryClient();
  const router = useRouter();
  const userInfo = queryClient.getQueryData<IUserInfo>(["userInfo"]);

  const { mutate: buyQuizbook } = useMutation(
    (quizbookId: number) => postQuizbookPurchase(quizbookId),
    {
      onSuccess: () => {
        router.reload();
      },
    }
  );

  const onBuyClick = (quizbookId: number) => {
    buyQuizbook(quizbookId);
  };

  const tag = (content: string) => {
    return (
      <span className="p-1 px-2 rounded-2xl text-xs bg-indigo-200">
        {content}
      </span>
    );
  };
  const quizTypes = [
    { type: "객관식", count: choiceQuizNum },
    { type: "주관식", count: shortQuizNum },
    { type: "서술형", count: longQuizNum },
  ];

  return (
    <div className="fixed w-1/3 sm:w-4/5 left-1/2 top-1/4 -translate-x-1/2 flex flex-col gap-5 bg-white py-6 px-8">
      <div className="flex justify-between">
        <span className="flex justify-around items-center gap-3">
          <h2 className="text-xl">문제집 #{quizPackageID}</h2>
          <span className="text-sm text-gray-700">
            {quizPackageCost} 샤프심 (보유: {userInfo?.point})
          </span>
        </span>
        <Icon icon="bi:x-lg" onClick={onClick} className="cursor-pointer" />
      </div>
      <div>
        <h4>문제 총 {quizNum}개</h4>
        <div className="flex gap-1">
          {quizTypes.map((quizType) => (
            <span key={quizType.type}>
              {tag(`${quizType.type} ${quizType.count}`)}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4>키워드</h4>
        <div className="flex flex-wrap gap-1">
          {keywords.map((keyword, idx) => (
            <span key={idx}>{tag(keyword)}</span>
          ))}
        </div>
      </div>
      <button
        onClick={() => onBuyClick(quizPackageID)}
        className="bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      >
        구매하기
      </button>
    </div>
  );
}

export default QuizBookPurchaseModal;
