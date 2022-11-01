import React from "react";
import { getJwtToken } from "../api/getJwtToken";
import DashboardPage from "../components/dashboard";
import LandingPage from "../components/landing";
function HomePage() {
  const isLoginUser = getJwtToken();

  return (
    <>
      {isLoginUser === undefined && <></>}
      {isLoginUser ? <DashboardPage /> : <LandingPage />}
    </>
  );
}

export default HomePage;
