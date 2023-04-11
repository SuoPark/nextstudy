import {ReactNode} from "react";
import {IOptionYN} from "@/types/common";

export type IBlackConsumerParams = {
  memberNo: string
}

export type IBlackConsumerAddParams = {
  memberNoList: number[]
  refetch: any
}

export type IBlackConsumerDetailRes = {
  memberBlackConsumerNo: number
  memberNo: number
  orderNoList: string
  reasonDesc: string
  useYn: IOptionYN
}

export type BlackConsumerProps = {
  memberNo?: number[]
  children?: ReactNode
  detailData?: IBlackConsumerDetailRes | null
  disabled?: boolean
  onSubmit?: (payload: any) => void
}

export type IBlackListParams = {
  memberBlackConsumerNo: string
  refetch?: any
}

export type IBlackListRefecthParams = {
  refetch?: any
}

export type BlackListProps = {
  children?: ReactNode
  detailData?: IBlackListDetailRes | null
  disabled?: boolean
  onSubmit?: (payload: any) => void
}

export type IBlackListDetailRes = {
  memberBlackConsumerNo: string
  memberNo: string
  blackConsumerType: string
  blockReasonCode: string
  joinBlockYn: IOptionYN
  buyBlockYn: IOptionYN
  commentBlockYn: IOptionYN
  blockStartDatetime: string
  blockEndDatetime: string
  reasonDesc: string
  useYn: IOptionYN
}

export type IBlackListAddParams = {
  memberNoList: number[]
  refetch: any
}

export type IBlackListAddProps = {
  children?: ReactNode
  disabled?: boolean
  onSubmit?: (payload: any) => void
}
