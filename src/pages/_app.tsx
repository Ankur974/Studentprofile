import { NextAdapter } from "next-query-params";

import { persistor, store } from "@redux/stores";
import { PersistGate } from "redux-persist/integration/react";

import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { QueryParamProvider } from "use-query-params";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryParamProvider adapter={NextAdapter}>
          <Component {...pageProps} />
        </QueryParamProvider>
      </PersistGate>
    </Provider>
  );
}
