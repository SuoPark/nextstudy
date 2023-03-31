import fetcher from "@/utils/fetcher";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Cookies } from "react-cookie";
import { useMutation, UseMutationOptions } from "react-query";
import API_AUTH from "../../assets/api/auth";

export interface ISignInParams {
  userId: string;
  password: string;
}

export interface ISignInRes {
  accessToken: string;
  refreshToken: string;
}

export const fetch = async (options: ISignInParams) =>
  await fetcher({ api: API_AUTH.SIGN_IN, options }).then(({ data }) => data);

export const setToken = ({ accessToken, refreshToken }: ISignInRes) => {
  const cookies = new Cookies();
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  cookies.set("accessToken", accessToken, { path: "/" });
  cookies.set("refreshToken", refreshToken, { path: "/" });
};

const useSignIn = (
  options?: UseMutationOptions<
    AxiosResponse<ISignInRes>,
    AxiosError,
    ISignInParams
  >
) => {
  return useMutation(fetch, {
    ...options,
    onSuccess: (data, variables, context) => {},
    onError: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  });
};

export default useSignIn;
