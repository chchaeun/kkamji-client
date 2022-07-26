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
  const { data: submitPeriods } = useQuery<ISubmitPeriod[]>(
    ["submitPeriods"],
    fetchSubmitPeriods
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
            <Quizbook
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
          {modalQuizbook && <QuizbookPurchaseModal props={modalQuizbook} />}
        </>
      )}
    </>
  );
};

export default Home;
