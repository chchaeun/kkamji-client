import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Script from "next/script";
import { pageview, GA_TRACKING_ID } from "../utils/gtag";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { FirebaseApp, initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseConfig } from "../utils/FirebaseConfig";
import Layout from "../components/layout/Layout";
import HeadTitle from "../components/common/HeadTitle";

import { getJwtToken } from "../api/utils/getJwtToken";
import { deleteDB } from "idb";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        networkMode: "always",
      },
    },
  });

  const dehydratedState = dehydrate(queryClient);

  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    require("../mocks");
  }

  const router = useRouter();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);

    setPerformanceMonitoring(app);
    setNotification(app);

    setGoogleAnalytics();

    const isUser = getJwtToken();

    setIndexedDB(isUser);

    checkAuth(isUser);
  }, []);

  const setPerformanceMonitoring = (app: FirebaseApp) => {
    const performance = getPerformance(app);
  };

  const setNotification = (app: FirebaseApp) => {
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {});
  };

  const setGoogleAnalytics = () => {
    const handleRouteChange = (url: URL) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  };

  const setIndexedDB = (isUser: string) => {
    const dbName = "api-store";
    if (!isUser) {
      deleteDB(dbName);
    }
  };

  const checkAuth = (isUser: string) => {
    const publicPages = [
      "/",
      "/login",
      "/manual",
      "/introduce",
      "/password-notice",
    ];
    if (!isUser && !publicPages.includes(router.asPath)) {
      alert("로그인이 필요합니다.");
      router.push("/");
    }
  };

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <Layout>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
                `,
              }}
            />
            <HeadTitle name="깜지" />
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
