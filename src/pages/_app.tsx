import Layout from "@/components/layout/Layout";
import { theme } from "@/configs/theme";
import { AuthProvider } from "@/context/AuthContext";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ThemeProvider } from "styled-components";
import React, { useState } from "react";
import wrapper from "./../store/configureStore";
import { QueryClient, QueryClientProvider } from "react-query";
import { SettingsProvider } from "@/context/SettingContext";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps }: AppProps) => {
  //const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  const [client] = useState(() => new QueryClient());
  console.log("session:" + pageProps.session);
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={client}>
          <AuthProvider>
            <SettingsProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ThemeProvider>
            </SettingsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};
export default wrapper.withRedux(App);
