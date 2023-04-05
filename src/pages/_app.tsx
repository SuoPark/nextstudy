import Layout from "@/components/layout/Layout";
import { theme } from "@/configs/theme";
import { AuthProvider } from "@/context/AuthContext";
import { CssBaseline } from "@mui/material";
import type { AppContext, AppInitialProps, AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import React, { Fragment, useState } from "react";
import wrapper, { RootState } from "./../store/configureStore";
import { QueryClient, QueryClientProvider } from "react-query";
import { SettingsProvider } from "@/context/SettingContext";

import { Provider, useSelector } from "react-redux";
import { NextPage } from "next";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { cookieStringToObject } from "@/utils/utils";
type ExtendedAppProps = AppProps & {
  Component: NextPage;
};
const App = ({ Component, pageProps }: ExtendedAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  const [client] = useState(() => new QueryClient());

  const { dialogs } = useSelector(({ dialogs }: RootState) => dialogs);
  return (
    <>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <SettingsProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
              {dialogs.map(({ comp }, i) => (
                <Fragment key={i}>{comp}</Fragment>
              ))}
              <Toaster />
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

App.getInitialProps = async ({
  ctx,
  Component,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};
  const cookieReq: any = ctx.req ? ctx.req.headers.cookie : null;
  const { accessToken, refreshToken } = cookieStringToObject(cookieReq);
  if (accessToken) {
    // ssr axios 토큰 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps: {
      ...pageProps,
    },
  };
};
export default wrapper.withRedux(App);
