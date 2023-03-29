import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@mui/material";
import LoginBox from "./../components/login/LoginBox";
export interface AuthValuesType {
  logout: () => void;
  user: userDataType | null;
  setUser: (value: userDataType | null) => void;
  login: (value: userDataType) => void;
  // user: UserDataType | null
  // setUser: (value: UserDataType | null) => void
  // login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}

export interface userDataType {
  userName: string;
  email: string;
  password: string;
}
const defalutProvider: AuthValuesType = {
  logout: () => null,
  login: () => null,
  user: null,
  setUser: () => null,
};

const AuthContext = createContext(defalutProvider);

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<userDataType | null>(defalutProvider.user);
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    // initAuth();
  }, []);

  const handleLogout = () => {
    setUser(null);
    router.push("/auth/signIn");
    signOut();
  };

  const handleLogin = async ({ email, userName, password }: userDataType) => {
    setUser({ email, userName, password });
    console.log("!");
    const response = await signIn("email-password-credential", {
      email,
      password,
      redirect: false,
    });
    console.log(response);
  };

  const initAuth = () => {
    const loginData = localStorage.getItem("test_login");
    if (!data) {
      signIn();
    }
    // if (!loginData) {
    //   router.replace(`/auth/signIn`);
    // }
  };

  const values = {
    user,
    setUser,
    logout: handleLogout,
    login: handleLogin,
  };
  if (!data) {
    return <Button onClick={() => signIn()}>Login</Button>;
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
