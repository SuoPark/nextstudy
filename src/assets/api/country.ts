import { IApi } from '@/types/common'

const API: { [key: string]: IApi } = {
  COUNTRY_LIST: {
    url: '/api/adm/country/list',
    method: 'get'
  },
  COUNTRY_OPTION: {
    url: '/api/adm/country/countryOption',
    method: 'get'
  },
  COUNTRY_GET: {
    url: '/api/adm/country',
    method: 'get'
  },
  COUNTRY_CREATE: {
    url: '/api/adm/country',
    method: 'post'
  },
  COUNTRY_UPDATE: {
    url: '/api/adm/country',
    method: 'put'
  },
  COUNTRY_EXCEL_DOWNLOAD: {
    url: '/api/adm/country/excel',
    method: 'get'
  },
  COUNTRY_DUPLICATE_CHECK: {
    url: '/api/adm/country/duplicate',
    method: 'get'
  }
}

export default API
