import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import useSignIn, { setToken } from "../hooks/queries/useSignIn";
import { useMutation, useQueryClient } from "react-query";
import QUERY_KEYS from "@/assets/constants/queries";
import { Cookies } from "react-cookie";
import authConfig from "@/configs/auth";
import { fetchAdminInfo } from "@/hooks/useAdminInfo";
import {
  AuthValuesType,
  ErrCallbackType,
  LoginParams,
  RegisterParams,
  UserDataType,
} from "@/types/authTypes";
import { useDispatch } from "react-redux";
import API_AUTH from "@/assets/api/auth";
import fetcher from "@/utils/fetcher";
import axios from "axios";

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve(),
  refreshToken: () => null,
};

const AuthContext = createContext(defaultProvider);

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const cookies = new Cookies();
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState<boolean>(
    defaultProvider.isInitialized
  );
  const useRefreshToken = useMutation(
    async (options: { userId: string; refreshToken: string }) =>
      await fetcher({ api: API_AUTH.REFRESH_TOKEN, options }).then(
        (data) => data.data
      )
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useSignIn();
  // const dispatch = useDispatch();

  useEffect(() => {
    initAuth();
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     const { pathname } = router;
  //     const { adminMenuList } = user;
  //     dispatch(
  //       breadcrumbsActions.setBreadCrumbs({ menuList: adminMenuList, pathname })
  //     );
  //   }
  //   return () => {
  //     dispatch(breadcrumbsActions.clear({}));
  //   };
  // }, [user, router.route]);

  const handleLogout = () => {
    setIsInitialized(false);
    setUser(null);
    localStorage.removeItem("userId");
    cookies.remove("accessToken", { path: "/" });
    cookies.remove("refreshToken", { path: "/" });
    router.push("/auth/signIn");
  };

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    mutate(params, {
      onSuccess: ({ data, status, success, message }) => {
        if (status === "OK") {
          const { accessToken, refreshToken } = data;
          const returnUrl = router.query.returnUrl;
          const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
          setToken({ accessToken, refreshToken });
          queryClient
            .fetchQuery([QUERY_KEYS.SIGN_IN], fetchAdminInfo)
            .then((userData) => {
              setLoading(false);
              setUser(userData);
              localStorage.setItem("userId", userData.adminId);
            })
            .catch(() => {
              setLoading(false);
            });
          console.log("성공진입");
          router.replace(redirectURL as string);
        } else if (success === false) {
          console.log("success실패진입");
          alert(message);
        } else {
          console.log("etc진입");
          alert(message);
        }
      },
      onError: (error: any) => {
        alert(error.response.data.message);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    });
  };

  const handleRegister = (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then((res) => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error);
        } else {
          handleLogin({ userId: params.email, password: params.password });
        }
      })
      .catch((err: { [key: string]: string }) =>
        errorCallback ? errorCallback(err) : null
      );
  };

  const initAuth = async (): Promise<void> => {
    const { accessToken } = cookies.getAll();
    setIsInitialized(true);
    if (accessToken) {
      queryClient
        .fetchQuery([QUERY_KEYS.SIGN_IN], fetchAdminInfo)
        .then((userData) => {
          setLoading(false);
          setUser(userData);
          localStorage.setItem("userId", userData.adminId);
        })
        .catch((error: any) => {
          setLoading(false);
          router.replace(`/auth/signIn`);
        });
    } else {
      setLoading(false);
      router.replace(`/auth/signIn`);
    }
  };

  const handleRefreshToken = ({
    userId,
    refreshToken,
  }: {
    userId: string;
    refreshToken: string;
  }) => {
    useRefreshToken.mutate(
      { userId, refreshToken },
      {
        onSuccess: (data) => {
          const { accessToken, refreshToken, username } = data.data;
          setToken({ accessToken, refreshToken });
          localStorage.setItem("userId", username);
          initAuth();
        },
        onError: () => {
          handleLogout();
        },
      }
    );
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    refreshToken: handleRefreshToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
