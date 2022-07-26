import axios from "axios";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuizBook from "../components/quiz/quizbook";
import api from "../api/my-api";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizbooks, IQuizBook } from "../api/quiz/fetch-quizbooks";
import { fetchUserInfo, IUserInfo } from "../api/user/fetch-user-info";
import {
  fetchSubmitPeriods,
  ISubmitPeriod,
} from "../api/submit/fetch-submit-periods";
import Overlay from "../components/layout/overlay";
import QuizBookPurchaseModal from "../components/quiz/quizbook-purchase-modal";

const Home: NextPage = () => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalQuizBook, setModalQuizBook] = useState<IQuizBook>();

  useEffect(() => {
    if (!sessionStorage.getItem("code")) {
      router.push("/login");
    }
  }, [router]);

  const { data: userInfo } = useQuery<IUserInfo>(["userInfo"], fetchUserInfo);
  const { data: quizbooks } = useQuery<IQuizBook[]>(
    ["quizbooks"],
    fetchQuizbooks
  );
  const { data: submitPeriods } = useQuery<ISubmitPeriod[]>(
    ["submitPeriods"],
    fetchSubmitPeriods
  );

  const onQuizBookClick = (quizbook: IQuizBook) => {
    if (quizbook.isOwned) {
      router.push(`quizbook/${quizbook.quizPackageID}`);
    } else {
      setModalOpen(true);
      setModalQuizBook(quizbook);
    }
  };
  const onOverlayClick = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div className="">
        <div>
          <h2>
            {userInfo?.userName} 님,{" "}
            {userInfo?.period
              ? `${userInfo?.period}일째 연속 제출 중!`
              : "오늘 하루"}{" "}
            힘내세요!
          </h2>
          <span>보유 샤프심: {userInfo?.point}</span>
        </div>
        <div>
          {quizbooks?.map((quizbook) => (
            <QuizBook
              key={quizbook.quizPackageID}
              props={quizbook}
              onClick={() => onQuizBookClick(quizbook)}
            />
          ))}
        </div>
      </div>
      <div>
        <span>오늘의 꾸준 챌린저</span>
        {submitPeriods?.map((submitPeriod, idx) => (
          <span key={idx}>
            {submitPeriod.userName} {submitPeriod.continuousSubmissionPeriod}일
            연속 제출
          </span>
        ))}
        <a>문제 제출하기</a>
      </div>
      {modalOpen && (
        <>
          <Overlay onClick={onOverlayClick} />
          {modalQuizBook && <QuizBookPurchaseModal props={modalQuizBook} />}
        </>
      )}
    </>
  );
};

export default Home;
