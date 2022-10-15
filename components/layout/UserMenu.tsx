import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

function UserMenu() {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const onMenuClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const onDashboardlick = () => {
    setShowDropdown(false);

    router.push("/");
  };

  const onLogoutClick = () => {
    setShowDropdown(false);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <DropdownBlock>
      <RoundProfile onClick={onMenuClick}>
        <Icon icon="heroicons-solid:user" fontSize={22} color={"#ffffff"} />
      </RoundProfile>
      {showDropdown && (
        <Dropdown>
          <Button onClick={onDashboardlick}>내 챌린지</Button>
          <Button onClick={onLogoutClick}>로그아웃</Button>
        </Dropdown>
      )}
    </DropdownBlock>
  );
}

export default UserMenu;

const RoundProfile = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;

  border-radius: 100%;

  background: #e5e7eb;

  cursor: pointer;
`;

const DropdownBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Dropdown = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 0px;

  position: absolute;
  width: 100px;
  margin: 32px 0px;

  background: #ffffff;

  border: 1px solid #f3f4f6;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;

  padding: 8px 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  &:hover {
    background: #f3f4f6;
  }
`;
