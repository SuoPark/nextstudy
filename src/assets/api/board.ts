import { IApi } from "@/types/common";

const API: { [key: string]: IApi } = {
  ANSWER_TEMPLATE_LIST: {
    url: "/api/adm/board/answerTemplate/list",
    method: "get",
  },
  ANSWER_TEMPLATE_GET: {
    url: "/api/adm/board/answerTemplate",
    method: "get",
  },
  ANSWER_TEMPLATE_POST: {
    url: "/api/adm/board/answerTemplate/add",
    method: "post",
  },
  ANSWER_TEMPLATE_PUT: {
    url: "/api/adm/board/answerTemplate",
    method: "put",
  },
  ANSWER_TEMPLATE_PUT_TOGGLE: {
    url: "/api/adm/board/answerTemplate/useYn",
    method: "put",
  },
  ANSWER_TEMPLATE_DELETE: {
    url: "/api/adm/board/answerTemplate",
    method: "delete",
  },
  ONE_TO_ONE_QUESTION_LIST: {
    url: "/api/adm/board/oneToOneQuestion/list",
    method: "get",
  },
  ONE_TO_ONE_QUESTION_GET: {
    url: "/api/adm/board/oneToOneQuestion",
    method: "get",
  },
  ONE_TO_ONE_QUESTION_LIST_EXCEL: {
    url: "/api/adm/board/oneToOneQuestion/list/excel",
    method: "get",
  },
  ONE_TO_ONE_QUESTION_ANSWER_PUT: {
    url: "/api/adm/board/oneToOneQuestion/answer/modify",
    method: "put",
  },
  ONE_TO_ONE_QUESTION_ANSWER_DELETE: {
    url: "/api/adm/board/oneToOneQuestion/answer/delete",
    method: "put",
  },
  NOTICE_LIST: {
    url: "/api/adm/board/notice/list",
    method: "get",
  },
  NOTICE_GET: {
    url: "/api/adm/board/notice",
    method: "get",
  },
  NOTICE_POST: {
    url: "/api/adm/board/notice/add",
    method: "post",
  },
  NOTICE_PUT: {
    url: "/api/adm/board/notice/modify",
    method: "put",
  },
  NOTICE_DISPLAY_SEQ_UPDATE: {
    url: `/api/adm/board/notice/displaySeq`,
    method: `put`,
  },
  NOTICE_DELETE: {
    url: "/api/adm/board/notice/delete",
    method: "delete",
  },
  FAQ_LIST: {
    url: "/api/adm/board/faq/list",
    method: "get",
  },
  FAQ_GET: {
    url: "/api/adm/board/faq",
    method: "get",
  },
  FAQ_POST: {
    url: "/api/adm/board/faq/add",
    method: "post",
  },
  FAQ_PUT: {
    url: "/api/adm/board/faq",
    method: "put",
  },
  FAQ_DISPLAY_SEQ_UPDATE: {
    url: `/api/adm/board/faq/displaySeq`,
    method: `put`,
  },
  FAQ_DELETE: {
    url: "/api/adm/board/faq",
    method: "delete",
  },
  MANAGER_LIST: {
    url: "/api/adm/board/questionTypeManager/list",
    method: "get",
  },
  PRODUCT_REVIEW_LIST: {
    url: "/api/adm/board/productReview/list",
    method: "get",
  },
  PRODUCT_REVIEW_GET: {
    url: "/api/adm/board/productReview",
    method: "get",
  },
  PRODUCT_REVIEW_OPEN_TYPE_UPDATE: {
    url: "/api/adm/board/productReview/openType",
    method: "put",
  },
  PRODUCT_REVIEW_BEST_REVIEW_UPDATE: {
    url: "/api/adm/board/productReview/bestReviewYn",
    method: "put",
  },
  PRODUCT_REVIEW_ANSWER_UPDATE: {
    url: "/api/adm/board/productReview/answer/modify",
    method: "put",
  },
  PRODUCT_REVIEW_ANSWER_DELETE: {
    url: "/api/adm/board/productReview/answer/delete",
    method: "put",
  },
  PRODUCT_REVIEW_EXCEL_DOWNLOAD: {
    url: `/api/adm/board/productReview/list/excel`,
    method: `get`,
  },
  PRODUCT_QUESTION_LIST: {
    url: "/api/adm/board/productQuestion/list",
    method: "get",
  },
  PRODUCT_QUESTION_OPEN_TYPE_UPDATE: {
    url: "/api/adm/board/productQuestion/openType",
    method: "put",
  },
  PRODUCT_QUESTION_EXCEL_DOWNLOAD: {
    url: "/api/adm/board/productQuestion/list/excel",
    method: "get",
  },
  PRODUCT_QUESTION_ANSWER_PUT: {
    url: "/api/adm/board/productQuestion/answer/modify",
    method: "put",
  },
  PRODUCT_QUESTION_ANSWER_DELETE: {
    url: "/api/adm/board/productQuestion/answer/delete",
    method: "put",
  },
  MANAGER_GET: {
    url: "/api/adm/board/questionTypeManager",
    method: "get",
  },
  MANAGER_POST: {
    url: "/api/adm/board/questionTypeManager/add",
    method: "post",
  },
  MANAGER_UPDATE: {
    url: "/api/adm/board/questionTypeManager",
    method: "put",
  },
  MANAGER_DELETE: {
    url: "/api/adm/board/questionTypeManager",
    method: "delete",
  },
};

export default API;
