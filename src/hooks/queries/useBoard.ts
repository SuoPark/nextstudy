import { AxiosError, AxiosResponse } from "axios";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import fetcher from "@/utils/fetcher";
import API_BOARD from "@/assets/api/auth";
import QUERY_KEYS from "@/assets/constants/queries";

export interface IOneToOneQuestionAnswerUpdateReq {
  oneToOneQuestionNo: any;
  answerContent: string;
}

export interface IOneToOneQuestionAnswerDeleteReq {
  oneToOneQuestionNo: any;
}

export interface IOneToOneQuestionDetailReq {
  oneToOneQuestionNo: any;
}

export const fetchOneToOneQuestionDetail = async ({
  oneToOneQuestionNo,
}: IOneToOneQuestionDetailReq) => {
  const { url, method } = API_BOARD.ONE_TO_ONE_QUESTION_GET;
  return await fetcher({
    api: {
      url: `${url}/${oneToOneQuestionNo}`,
      method,
    },
  }).then(({ data }) => data.data);
};

export const fetchOneToOneQuestionAnswerUpdate = async (
  options: IOneToOneQuestionAnswerUpdateReq
) => {
  const { url, method } = API_BOARD.ONE_TO_ONE_QUESTION_ANSWER_PUT;
  const { oneToOneQuestionNo } = options;
  return await fetcher({
    api: {
      url: `${url}/${oneToOneQuestionNo}`,
      method,
    },
    options,
  }).then(({ data }) => data);
};

export const fetchOneToOneQuestionAnswerDelete = async ({
  oneToOneQuestionNo,
}: IOneToOneQuestionAnswerDeleteReq) => {
  const { url, method } = API_BOARD.ONE_TO_ONE_QUESTION_ANSWER_DELETE;
  return await fetcher({
    api: {
      url: `${url}/${oneToOneQuestionNo}`,
      method,
    },
  }).then(({ data }) => data);
};

function useOneToOneQuestionAnswerUpdate(
  options?: UseMutationOptions<
    AxiosResponse<any>,
    AxiosError,
    IOneToOneQuestionAnswerUpdateReq
  >
): UseMutationResult<any, AxiosError, IOneToOneQuestionAnswerUpdateReq> {
  return useMutation(fetchOneToOneQuestionAnswerUpdate, {
    ...options,
    onSuccess: (data, variables, context) => {},
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  });
}

function useOneToOneQuestionDetail(
  queryKey: IOneToOneQuestionDetailReq,
  options?: UseQueryOptions<AxiosResponse<any>, AxiosError, any, QueryKey[]>
): UseQueryResult<any, AxiosError> {
  return useQuery(
    [QUERY_KEYS.ONE_TO_ONE_QUESTION_DETAIL, queryKey.oneToOneQuestionNo],
    () => fetchOneToOneQuestionDetail(queryKey),
    options
  );
}

function useOneToOneQuestionAnswerDelete(
  options?: UseMutationOptions<
    AxiosResponse<any>,
    AxiosError,
    IOneToOneQuestionAnswerDeleteReq
  >
): UseMutationResult<any, AxiosError, IOneToOneQuestionAnswerDeleteReq> {
  return useMutation(fetchOneToOneQuestionAnswerDelete, {
    ...options,
    onSuccess: (data, variables, context) => {},
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  });
}

export {
  useOneToOneQuestionDetail,
  useOneToOneQuestionAnswerUpdate,
  useOneToOneQuestionAnswerDelete,
};
