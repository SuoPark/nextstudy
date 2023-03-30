import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import useSignIn, { setToken, userLoginType } from "./../hooks/useSignIn";
import { useQuery, useQueryClient } from "react-query";
import { QueryClient } from "react-query";
import QUERY_KEYS from "@/assets/constants/queries";
import { Cookies } from "react-cookie";
export interface AuthValuesType {
  logout: () => void;
  user: userLoginType | null;
  setUser: (value: userLoginType | null) => void;
  login: (value: userLoginType) => void;
  // user: UserDataType | null
  // setUser: (value: UserDataType | null) => void
  // login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
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
  const [user, setUser] = useState<userLoginType | null>(defalutProvider.user);
  const router = useRouter();
  const cookies = new Cookies();
  const { mutate } = useSignIn();
  useEffect(() => {
    initAuth();
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userEmail");
    cookies.remove("accessToken", { path: "/" });
    cookies.remove("refreshToken", { path: "/" });
    router.push("/auth/signIn");
  };

  const handleLogin = (params: userLoginType) => {
    mutate(params, {
      onSuccess: ({ data }) => {
        const { accessToken, refreshToken } = data;
        const returnUrl = router.query.returnUrl;
        const redirectUrl = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        setToken({ accessToken, refreshToken });
        //queryClient.fetchQuery([QUERY_KEYS.SIGNIN],);
        setUser({ email: params.email, password: params.password });
        localStorage.setItem("userEmail", params.email);
        router.replace(redirectUrl as string);
      },
      onError: (error: any) => {
        alert(error.response.data.message);
      },
    });
  };

  const initAuth = () => {
    const loginData = localStorage.getItem("userEmail");

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
