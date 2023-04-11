import { IApi } from '@/types/common';

const API: { [key: string]: IApi } = {
  // 상품카테고리
  CATEGORY_LIST: {
    url: '/api/adm/category/list',
    method: 'get'
  },
  CATEGORY_TREE: {
    url: '/api/adm/category/treeview',
    method: 'get'
  },
  CATEGORY_LARGE_GET: {
    url: '/api/adm/categoryLarge',
    method: 'get'
  },
  CATEGORY_LARGE_CREATE: {
    url: '/api/adm/categoryLarge',
    method: 'post'
  },
  CATEGORY_LARGE_PUT: {
    url: '/api/adm/categoryLarge',
    method: 'put'
  },
  CATEGORY_LARGE_DELETE: {
    url: '/api/adm/categoryLarge',
    method: 'delete'
  },
  CATEGORY_MEDIUM_COUNT: {
    url: '/api/adm/categoryMedium/count',
    method: 'get'
  },
  CATEGORY_MEDIUM_GET: {
    url: '/api/adm/categoryMedium',
    method: 'get'
  },
  CATEGORY_MEDIUM_CREATE: {
    url: '/api/adm/categoryMedium',
    method: 'post'
  },
  CATEGORY_MEDIUM_PUT: {
    url: '/api/adm/categoryMedium',
    method: 'put'
  },
  CATEGORY_MEDIUM_DELETE: {
    url: '/api/adm/categoryMedium',
    method: 'delete'
  },
  CATEGORY_SMALL_COUNT: {
    url: '/api/adm/categorySmall/count',
    method: 'get'
  },
  CATEGORY_SMALL_GET: {
    url: '/api/adm/categorySmall',
    method: 'get'
  },
  CATEGORY_SMALL_CREATE: {
    url: '/api/adm/categorySmall',
    method: 'post'
  },
  CATEGORY_SMALL_PUT: {
    url: '/api/adm/categorySmall',
    method: 'put'
  },
  CATEGORY_SMALL_DELETE: {
    url: '/api/adm/categorySmall',
    method: 'delete'
  },
  CATEGORY_DRAG: {
    url: '/api/adm/category/drag',
    method: 'put'
  },
  CATEGORY_ADM: {
    url: '/api/adm',
    method: 'get'
  },

  // 상품카테고리 수수료현황
  CATEGORY_COMMISSION_LIST: {
    url: '/api/adm/seller/commission',
    method: 'get'
  },
  CATEGORY_COMMISSION_EXCEL: {
    url: '/api/adm/seller/commission/excel',
    method: 'get'
  }
};

export default API;
