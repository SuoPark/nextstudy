import { IApi } from '@/types/common'

const API: { [key: string]: IApi } = {
  MEMBER_GET: {
    url: '/api/adm/members',
    method: 'get'
  },
  MEMBER_PUT: {
    url:'/api/adm/members/modify',
    method:'put',
  },
  MEMBER_RESIGN: {
    url: '/api/adm/members/delete',
    method: 'put'
  },
  MEMBER_LIST_EXCEL: {
    url: '/api/adm/members/excel',
    method: 'get'
  },
  BLACK_CONSUMER_DETAIL: {
    url: '/api/adm/blackConsumers',
    method: 'get'
  },
  BLACK_CONSUMER_POST: {
    url: '/api/adm/blackConsumers',
    method: 'post'
  },
  MEMBER_BLACK_CONSUMER_CANCEL: {
    url: '/api/adm/blackConsumers',
    method: 'delete'
  },
  MEMBER_BOARD: {
    url: '/api/adm/members/dashboard',
    method: 'get'
  },
  MEMBER_ORDER_CLAIM_GET: {
    url: '/api/adm/member/orderClaim',
    method: 'get'
  },
  MEMBER_ORDER_HISTORY_GET: {
    url: '/api/adm/member/orders',
    method: 'get'
  },
  MEMBER_ORDER_EXCEL: {
    url: '/api/adm/member/orders/excel',
    method: 'get'
  },
  MEMBER_POINT_HISTORY_GET: {
    url: '/api/adm/member/points',
    method: 'get'
  },
  MEMBER_POINT_EXCEL: {
    url: '/api/adm/member/point/excel',
    method: 'get'
  },
  MEMBER_POINT_POST: {
    url: '/api/adm/promotion/point/add',
    method: 'post'
  },
  MEMBER_HISTORY_GET: {
    url: '/api/adm/member/history',
    method: 'get'
  },
  SECESSIONS_GET: {
    url: '/api/adm/secessions',
    method: 'get'
  },
  SECESSIONS_EXCEL: {
    url: '/api/adm/secessions/excel',
    method: 'get'
  },
  BLACKLIST_GET: {
    url: '/api/adm/blackLists',
    method: 'get'
  },
  BLACKLIST_POST: {
    url: '/api/adm/blackLists',
    method: 'post'
  },
  BLACKLIST_PUT: {
    url: '/api/adm/blackLists',
    method: 'put'
  },
  BLACKLIST_DELETE: {
    url: '/api/adm/blackLists',
    method: 'delete'
  },
  BLACKLIST_MEMO: {
    url: '/api/adm/blackLists',
    method: 'get'
  },
  BLACKLIST_FINDID: {
    url: '/api/adm/idBlackLists',
    method: 'get'
  },
  MEMBERGRADE_TYPE_LIST: {
    url: '/api/adm/memberGradeType/list',
    method: 'get'
  },
  MEMBERNO_LIST_CHECK: {
    url: '/api/adm/member/checkMemberNoList',
    method: 'get'
  },
  MEMBER_ONE_TO_ONE_QUESTION_LIST: {
    url: `/api/adm/member/oneToOneQuestion/listPage`,
    method: `get`
  },
  MEMBER_ONE_TO_ONE_QUESTION_EXCEL: {
    url: `/api/adm/member/oneToOneQuestion/excel`,
    method: `get`
  },
  MEMBER_PRODUCT_QUESTION_LIST: {
    url: `/api/adm/member/productQuestion/listPage`,
    method: `get`
  },
  MEMBER_PRODUCT_QUESTION_EXCEL: {
    url: `/api/adm/member/productQuestion/excel`,
    method: `get`
  },
  MEMBER_PRODUCT_REVIEW_LIST: {
    url: `/api/adm/member/productReview/listPage`,
    method: `get`
  },
  MEMBER_MEMBER_ID_DUPLICATE: {
    url: `/api/adm/member/memberIdDuplicate`,
    method: `get`
  },
  MEMBER_NICKNAME_DUPLICATE: {
    url: `/api/adm/member/nickNameDuplicate`,
    method: `get`
  }
}

export default API
