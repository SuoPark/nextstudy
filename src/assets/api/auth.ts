import { IApi } from "@/type/common";

const API_AUTH: { [key: string]: IApi } = {
  SIGNIN: {
    url: "/api/admin/auth/signin",
    method: "post",
  },
};
export default API_AUTH;
