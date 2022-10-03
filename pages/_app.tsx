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
import { useEffect, useState } from "react";

import Script from "next/script";
import { pageview, GA_TRACKING_ID } from "../utils/gtag";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "../utils/FirebaseConfig";
import Layout from "../components/layout/LayoutComponent";

function MyApp({ Component, pageProps }: AppProps) {
  const [token, setToken] = useState("");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const dehydratedState = dehydrate(queryClient);

  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    require("../mocks");
  }

  const router = useRouter();

  useEffect(() => {
    if (
      document.location.hostname.search("kkamjidot.com") !== -1 &&
      document.location.hostname.search("test") === -1
    ) {
      const handleRouteChange = (url: URL) => {
        pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      router.events.on("hashChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
        router.events.off("hashChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const performance = getPerformance(app);

    const messaging = getMessaging(app);

    getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })
      .then((currentToken) => {
        setToken(currentToken);
      })
      .catch((err) => {});
    onMessage(messaging, (payload) => {});
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
            {token}
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
