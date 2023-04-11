import {ReactNode} from 'react'

export type IOptions = {
  label: string
  value: string
}

export type IMemberDetailProps = {
  memberNo: string
}

export type IMemberDetailReq = {
  memberNo: any
}

export type IMemberNoProps = {
  memberNo: any
  totalAvailablePoint?: number
  reSearchHandler?: () => void
  callbackBoard?: any
}

export type IPointHistoryFormProps = {
  children?: ReactNode
  detailData?: null
  disabled?: boolean
  onSubmit?: (payload: any) => void
}

export type IApi = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
}
