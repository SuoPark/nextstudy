import Layout from "@/components/layout/Layout";
import { theme } from "@/configs/theme";
import { AuthProvider } from "@/context/AuthContext";
import { CssBaseline } from "@mui/material";
import type { AppContext, AppInitialProps, AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import React, { useState } from "react";
import wrapper from "./../store/configureStore";
import { QueryClient, QueryClientProvider } from "react-query";
import { SettingsProvider } from "@/context/SettingContext";

import { Provider } from "react-redux";
import { NextPage } from "next";
import axios from "axios";
type ExtendedAppProps = AppProps & {
  Component: NextPage;
};
const App = ({ Component, pageProps }: ExtendedAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  const [client] = useState(() => new QueryClient());

  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <AuthProvider>
            <SettingsProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </ThemeProvider>
            </SettingsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
};
// const cookieStringToObject = (cookieString: string): { [key: string]: any } => {
//   const result: { [key: string]: string } = {};
//   if (cookieString) {
//     const cookies = cookieString.split("; ");
//     cookies.forEach((cookie) => {
//       const cur = cookie.split("=");
//       result[cur[0]] = cur[1];
//     });
//   }
//   return result;
// };
// App.getInitialProps = async ({
//   ctx,
//   Component,
// }: AppContext): Promise<AppInitialProps> => {
//   let pageProps = {};
//   const cookieReq: any = ctx.req ? ctx.req.headers.cookie : null;
//   const { accessToken, refreshToken } = cookieStringToObject;
//   if (accessToken) {
//     // ssr axios 토큰 설정
//     axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   }
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   return {
//     pageProps: {
//       ...pageProps,
//     },
//   };
// };
export default App;
