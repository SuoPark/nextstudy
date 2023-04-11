import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import QUERY_KEYS from "@/assets/constants/queries";
import fetcher from "@/utils/fetcher";
import { IMemberDetailReq } from "@/types/memberTypes";
import API_MEMBER from "@/assets/api/member";

// 회원 상세 조회
export const fetchMemberDetail = async ({ memberNo }: IMemberDetailReq) => {
  const { url, method } = API_MEMBER.MEMBER_GET;
  return await fetcher({
    api: {
      url: `${url}/${memberNo}`,
      method,
    },
  }).then(({ data }) => data.data);
};

function useMemberDetail(
  queryKey: IMemberDetailReq,
  options?: UseQueryOptions<AxiosResponse, AxiosError, any, QueryKey[]>
): UseQueryResult<any, AxiosError> {
  return useQuery(
    [QUERY_KEYS.MEMBER_DETAIL, queryKey.memberNo],
    () => fetchMemberDetail(queryKey),
    options
  );
}

export { useMemberDetail };
