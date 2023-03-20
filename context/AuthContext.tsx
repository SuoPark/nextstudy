import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

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
  userEmail: string;
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
  const router = useRouter();
  useEffect(() => {
    initAuth();
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("test_login");
    router.push("/auth/signIn");
  };

  const handleLogin = ({ userEmail, userName }: userDataType) => {
    setUser({ userEmail, userName });
    localStorage.setItem("test_login", "test");
    router.replace(`/`);
  };

  const initAuth = () => {
    const loginData = localStorage.getItem("test_login");

    if (!loginData) {
      router.replace(`/auth/signIn`);
    }
  };

  const values = {
    user,
    setUser,
    logout: handleLogout,
    login: handleLogin,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
