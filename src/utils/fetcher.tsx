import { IApi } from "@/type/common";
import axios from "axios";

const axiosInstance = () => {
  return axios.create({
    baseURL: "http://localhost:8080",
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
    });
  }
};

export default fetcher;
