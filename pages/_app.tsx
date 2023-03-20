import Layout from "@/components/template/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { SettingsConsumer, SettingsProvider } from "@/context/SettingContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <SettingsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SettingsProvider>
      </AuthProvider>
    </>
  );
}
