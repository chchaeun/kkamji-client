import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCode } from "../../api/session-code";
import styled from "styled-components";
import { media } from "../../styles/media";
function Header() {
  const router = useRouter();
  const isUser = getCode() ? true : false;

  const isSameRoute = (route: string) => {
    if (router.pathname === route) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {!isSameRoute("/login") && (
        <Container>
          <Link href="/">
            <Logo className="logo">깜지.</Logo>
          </Link>
          <Navigation>
            <Ul>
              <Li showInMedium={false}>
                <Link href="/introduce">깜지 소개</Link>
              </Li>
              <Li showInMedium={true}>
                <Link href="/manual">문제 매뉴얼</Link>
              </Li>
            </Ul>
            {isUser ? (
              <Link href={`/dashboard`}>
                <Button type="button">내 챌린지</Button>
              </Link>
            ) : (
              <Link href={`/login`}>
                <Button type="button">로그인</Button>
              </Link>
            )}
          </Navigation>
        </Container>
      )}
    </>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 31px;
  gap: 10px;

  position: fixed;
  width: 100%;
  height: 60px;
  left: 0px;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;

  z-index: 10;

  ${media.medium`
    padding: 10px 16px;
    height: 51px;
  `}
`;

const Logo = styled.h1`
  position: relative;
  width: 60px;
  height: 29px;
  bottom: 5px;

  font-size: 26px;
  font-family: "HSSummer";

  cursor: pointer;

  ${media.medium`
    font-size: 24px;
  `}
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 32px;

  width: 280px;
  height: 36px;

  ${media.medium`
    width: 160px;
    gap: 20px;
  `}
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

  width: 168px;
  height: 16px;

  ${media.medium`
    width: 70px;
  `}
`;

const Li = styled.li<{ showInMedium?: boolean }>`
  width: 76px;
  height: 16px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  display: flex;
  align-items: center;
  text-align: center;

  ${media.medium`
    display: ${(p: { showInMedium?: boolean }) =>
      p.showInMedium ? "flex" : "none"};
  `}
`;

const Button = styled.button`
  padding: 10px;
  gap: 10px;

  width: 84px;
  height: 36px;

  background: #171717;
  border-radius: 8px;

  color: #ffffff;
  font-size: 14px;
  line-height: 16px;

  ${media.medium`
    width: 77px;
    font-size: 12px;
  `}
`;
