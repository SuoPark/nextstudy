import { IApi } from "@/type/common";

const API_BOARD: { [key: string]: IApi } = {
  SAMPLE_LIST1: {
    url: "/test/get/sampleList1",
    method: "get",
  },
  SAMPLE_LIST2: {
    url: "/test/get/sampleList2",
    method: "get",
  },
};
export default API_BOARD;
