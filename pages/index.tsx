import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Quizbook from "../components/quiz/quizbook";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizbooks, IQuizbook } from "../api/quiz/quizbooks";
import { fetchUserInfo, IUserInfo } from "../api/user/user-info";
import {
  fetchSubmitPeriods,
  ISubmitPeriod,
} from "../api/submit/submit-periods";
import Overlay from "../components/layout/overlay";
import QuizbookPurchaseModal from "../components/quiz/quizbook-purchase-modal";
import { classNames } from "../styles/classname-maker";
import SubmitPeriods from "../components/submit/submit-periods";

const Home: NextPage = () => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalQuizbook, setModalQuizbook] = useState<IQuizbook>();

  useEffect(() => {
    if (!sessionStorage.getItem("code")) {
      router.push("/login");
    }
  }, [router]);

  const { data: userInfo } = useQuery<IUserInfo>(["userInfo"], fetchUserInfo);
  const { data: quizbooks } = useQuery<IQuizbook[]>(
    ["quizbooks"],
    fetchQuizbooks
  );

  const onQuizBookClick = (quizbook: IQuizbook) => {
    if (quizbook.isOwned) {
      router.push(`quizbook/${quizbook.quizPackageID}`);
    } else {
      setModalOpen(true);
      setModalQuizbook(quizbook);
    }
  };
  const onOverlayClick = () => {
    setModalOpen(false);
  };
  return (
    <div className="grid grid-cols-4 gap-4 w-full m-auto sm:flex bg-[#fafcff]">
      <div className="col-start-2 col-span-2 flex flex-col gap-10 sm:w-4/5 sm:m-auto sm:gap-7">
        <div className="flex flex-col items-center gap-2 py-10">
          <h2 className="text-xl sm:text-lg">
            {userInfo?.userName} 님,{" "}
            {userInfo?.period
              ? `${userInfo?.period}일째 연속 제출 중!`
              : "오늘 하루"}{" "}
            힘내세요!
          </h2>
          <span className="text-gray-700">보유 샤프심: {userInfo?.point}</span>
        </div>
        <h1 className="text-2xl">문제집</h1>
        <div className="grid grid-cols-2 gap-8 sm:flex sm:flex-col">
          {quizbooks?.map((quizbook) => (
            <Quizbook
              key={quizbook.quizPackageID}
              props={quizbook}
              onClick={() => onQuizBookClick(quizbook)}
            />
          ))}
        </div>
      </div>
      <SubmitPeriods />
      {modalOpen && (
        <>
          <Overlay onClick={onOverlayClick} />
          {modalQuizbook && (
            <QuizbookPurchaseModal
              props={modalQuizbook}
              onClick={onOverlayClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
