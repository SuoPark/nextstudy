import LoginBox from "@/components/login/LoginBox";
import { Button } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";
const Login = () => {
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <LoginBox />
    </>
  );
};
Login.getLayout = (page: ReactNode) => <>{page}</>;
export default Login;
