import { store } from "@/redux/stores";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryParamProvider adapter={NextAdapter}>
        <Component {...pageProps} />
      </QueryParamProvider>
    </Provider>
  );
}
