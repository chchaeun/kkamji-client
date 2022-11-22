import React, { useEffect } from "react";
import { getJwtToken } from "../api/utils/getJwtToken";
import DashboardPage from "../components/dashboard";
import LandingPage from "../components/landing";
function HomePage() {
  const isLoginUser = getJwtToken();

  return <>{isLoginUser ? <DashboardPage /> : <LandingPage />}</>;
}

export default HomePage;
