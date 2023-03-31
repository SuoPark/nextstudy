import { setToken } from "@/hooks/queries/useSignIn";
import { IApi } from "@/types/common";
import axios from "axios";
import { Cookies } from "react-cookie";

const axiosInstance = () => {
  return axios.create({
    baseURL: "http://localhost:7090",
    timeout: 100000,
    withCredentials: false,
  });
};

const fetcher = async function ({
  api,
  options = {},
}: {
  api: IApi;
  options?: { [key: string]: any };
}) {
  const Authorization = axios.defaults.headers.common["Authorization"];
  const cookies = new Cookies();
  const { accessToken, refreshToken } = cookies.getAll();

  if (!Authorization) {
    // 토큰이 유실되었다면 재설정
    if (accessToken) {
      setToken({ accessToken, refreshToken });
    }
  }

  const ax = axiosInstance();
  if (api.method === "get") {
    return await ax.request({
      ...api,
      url: api.url,
      params: options,
    });
  } else {
    return await ax.request({
      ...api,
      url: api.url,
      data: options,
    });
  }
};

export default fetcher;
