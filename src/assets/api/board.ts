import { IApi } from "@/types/common";

const API_BOARD: { [key: string]: IApi } = {
  SAMPLE_LIST1: {
    url: "/test/get/sampleList1",
    method: "get",
  },
  SAMPLE_LIST2: {
    url: "/test/get/sampleList2",
    method: "get",
  },
  SAMPLE_LIST3: {
    url: "/test/get/sampleList3",
    method: "get",
  },
  SAMPLE_LIST4: {
    url: "/test/get/sampleList4",
    method: "get",
  },
  SAMPLE_LIST5: {
    url: "/test/get/sampleList5",
    method: "get",
  },
  ONE_TO_ONE_QUESTION_LIST: {
    url: "/api/adm/board/oneToOneQuestion/list",
    method: "get",
  },
};
export default API_BOARD;
