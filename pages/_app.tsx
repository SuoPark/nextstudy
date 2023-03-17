import SideMenu from "@/components/organism/SideMenu";
import Layout from "@/components/template/Layout";
import { SettingsProvider } from "@/context/settingContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SettingsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SettingsProvider>
    </>
  );
}
