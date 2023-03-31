import { IApi } from "@/types/common";

const API_AUTH: { [key: string]: IApi } = {
  SIGN_IN: {
    url: "/api/adm/auth/signin",
    method: "post",
  },
  ADMIN_INFO: {
    url: "/api/adm/auth/adminInfo",
    method: "get",
  },
  REFRESH_TOKEN: {
    url: "/api/adm/auth/refreshtoken",
    method: "post",
  },
};
export default API_AUTH;
