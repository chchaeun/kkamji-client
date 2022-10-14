import React from "react";
import { getToken } from "../api/getToken";
import DashboardPage from "../components/dashboard";
import LandingPage from "../components/landing";
function HomePage() {
  const isLoginUser = getToken();

  return (
    <>
      {isLoginUser === undefined && <></>}
      {isLoginUser ? <DashboardPage /> : <LandingPage />}
    </>
  );
}

export default HomePage;
