import API_AUTH from "@/assets/api/auth";
import QUERY_KEYS from "@/assets/constants/queries";
import { IOptionYN } from "@/types/common";
import fetcher from "@/utils/fetcher";
import { AxiosError, AxiosResponse } from "axios";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

export interface IAdminInfoState {
  adminId: string;
  adminName: string;
  adminNo: string;
  createDate: string;
  email: string;
  modifyDate: string;
  adminMenuList: IMenuItem;
}

export interface IMenuItem {
  // buttonList: any
  // children: IMenuItem[]
  // menuDesc: string
  // menuIconName: string
  // menuLevelSeq: number
  // menuName: string
  // menuNo: number
  // menuSortSeq: number
  // menuUrl: string | null
  // useYn: string | null
  // upperMenuNoFk: number | null
  adminMenuNo: number;
  upperMenuNo: number;
  menuName: string;
  menuLevel: number;
  displaySeq: number;
  menuUrl: string;
  menuDesc: string;
  useYn: IOptionYN;
  children: IMenuItem[] | null;
  adminMenuButtonList: IAdminMenuButton[] | null;
}

export interface IAdminMenuButton {
  adminMenuNo: number | null;
  buttonDesc: string;
  buttonId:
    | "list-create"
    | "create-save"
    | "create-cancel"
    | "update-save"
    | "update-cancel"
    | "view-update"
    | "view-delete"
    | "view-list";
}

export const fetchAdminInfo = async () =>
  await fetcher({ api: API_AUTH.ADMIN_INFO }).then(({ data }) => data.data);

/**
 * @category React Query
 * @description 관리자정보 - 권한/메뉴/자원(UI url)
 */
function useAdminInfo(
  // queryKey: QueryKey,
  options?: UseQueryOptions<
    AxiosResponse<IAdminInfoState>,
    AxiosError,
    IAdminInfoState,
    QueryKey[]
  >
): UseQueryResult<IAdminInfoState, AxiosError> {
  return useQuery([QUERY_KEYS.ADMIN_INFO], fetchAdminInfo, options);
}

export default useAdminInfo;
