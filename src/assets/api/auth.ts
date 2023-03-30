import { IApi } from "@/type/common";

const API_AUTH: { [key: string]: IApi } = {
  SIGN_IN: {
    url: "/api/admin/auth/signin",
    method: "post",
  },
  ADMIN_INFO: {
    url: "/api/admin/auth/adminInfo",
    method: "get",
  },
  REFRESH_TOKEN: {
    url: "/api/admin/auth/refreshtoken",
    method: "post",
  },
};
export default API_AUTH;
