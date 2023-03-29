import Layout from "@/components/layout/Layout";
import { theme } from "@/configs/theme";
import { AuthProvider } from "@/context/AuthContext";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import React, { useState } from "react";
import wrapper from "./../store/configureStore";
import { QueryClient, QueryClientProvider } from "react-query";
import { SettingsProvider } from "@/context/SettingContext";
import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";
import { NextPage } from "next";
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
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={client}>
            <AuthProvider>
              <SettingsProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {getLayout(<Component {...pageProps} />)}
                  {/* <Layout>
                    <Component {...pageProps} />
                  </Layout> */}
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </QueryClientProvider>
        </SessionProvider>
      </Provider>
    </>
  );
};
export default App;
