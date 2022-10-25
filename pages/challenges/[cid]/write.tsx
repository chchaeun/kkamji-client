import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderContainer from "../../../components/write/containers/HeaderContainer";
import WriteContainer from "../../../components/write/containers/WriteContainer";
import { media } from "../../../styles/media";

function QuizWritePage() {
  const router = useRouter();
  const challengeId = String(router.query.cid);

  const [isWriting, setIsWriting] = useState(false);

  const onBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isWriting) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  const onPopState = () => {
    if (isWriting) {
      const pageLeaveConfirmMessage =
        "페이지를 떠나시겠습니까? 변경 사항이 저장되지 않을 수 있습니다.";
      const pageLeave = confirm(pageLeaveConfirmMessage);
      if (pageLeave) {
        router.push(`/challenges/${challengeId}`);
      } else {
        history.pushState(null, "", location.href);
      }
    } else {
      router.push(`/challenges/${challengeId}`);
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onBeforeUnload);

    window.history.pushState(null, "", location.href);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return (
    <Background>
      <Frame>
        <HeaderContainer challengeId={challengeId} />
        <WriteContainer challengeId={challengeId} setIsWriting={setIsWriting} />
      </Frame>
    </Background>
  );
}

export default QuizWritePage;

const Background = styled.div`
  background-color: #f8fafc;
`;

const Frame = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  padding: 80px 0px;

  width: 720px;
  margin: 0 auto;

  background-color: #f8fafc;

  ${media.medium`
    width: 100%;
    padding: 60px 12px;
  `}
`;
