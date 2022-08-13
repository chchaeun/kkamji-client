import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    require("../mocks");
  }

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
