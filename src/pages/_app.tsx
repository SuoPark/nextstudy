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

type ExtendedAppProps = AppProps & {
  Component: NextPage;
};

const App = ({ Component, pageProps }: ExtendedAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  const [client] = useState(() => new QueryClient());
  return (
    <>
      <React.StrictMode>
        <SessionProvider session={pageProps.session}>
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
        </SessionProvider>
      </React.StrictMode>
    </>
  );
};
export default wrapper.withRedux(App);
