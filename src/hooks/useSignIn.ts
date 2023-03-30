import API_BOARD from "@/assets/api/board";
import fetcher from "@/utils/fetcher";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Cookies } from "react-cookie";
import { useMutation, UseMutationOptions } from "react-query";
import API_AUTH from "./../assets/api/auth";

export interface userLoginType {
  email: string;
  password: string;
}

export interface tokensType {
  accessToken: string;
  refreshToken: string;
}

export const fetch = async (options: userLoginType) =>
  await fetcher({ api: API_AUTH.SIGNIN, options }).then(({ data }) => data);

export const setToken = ({ accessToken, refreshToken }: tokensType) => {
  const cookies = new Cookies();
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  cookies.set("accessToken", accessToken, { path: "/" });
  cookies.set("refreshToken", refreshToken, { path: "/" });
};

const useSignIn = (
  options?: UseMutationOptions<
    AxiosResponse<tokensType>,
    AxiosError,
    userLoginType
  >
) => {
  return useMutation(fetch, {
    ...options,
    onSuccess: (data, variables, context) => {},
    onError: (data, variables, context) => {},
  });
};

export default useSignIn;
