import usePagination, { IPagination } from "@/hooks/usePagination";
import usePrevious from "@/hooks/usePrevious";
import { IApi } from "@/types/common";
import fetcher from "@/utils/fetcher";
import axios, { AxiosError } from "axios";
import router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IPaging } from "./../types/common";
interface IProps {
  children?: ReactNode;
  api: IApi;
  isEnabled?: boolean;
  queryKey?: string;
  isQueryString?: boolean;
  isSearchForm?: boolean;
  isPaging?: boolean;
  exValues?: { [key: string]: any };
  isList?: boolean; // 리스트일 경우
}

export interface IValueType {
  params: { [key: string]: any } | null;
  onSubmit: (data: { [key: string]: any }) => void;
  setParams: (data: { [key: string]: any }) => void;
  content: { [key: string]: any }[];
  isLoading: boolean;
  paging: IPagination | null;
  isEnabled: boolean;
  refetch: () => void;
  setContent: (content: { [key: string]: any }[]) => void;
  isQueryString: boolean;
}

interface IResType extends IPaging {
  content: { [key: string]: any }[];
}

// ** Defaults
const defaultProvider: IValueType = {
  params: null,
  onSubmit: () => null,
  content: [],
  setParams: () => null,
  isLoading: false,
  paging: null,
  isEnabled: false,
  refetch: () => null,
  setContent: () => null,
  isQueryString: true,
};

const SearchLsitContext = createContext(defaultProvider);

const SearchListProvider = ({
  children,
  api,
  queryKey,
  isEnabled = false,
  isQueryString = true,
  isSearchForm = true,
  isPaging = true,
  isList = false,
  exValues,
}: IProps) => {
  const [params, setParams] = useState<{ [key: string]: any } | null>(
    !isSearchForm && isEnabled ? exValues || null : null
  );
  const [content, setContent] = useState<{ [key: string]: any }[]>([]);
  const { data, isLoading, refetch } = useQuery<IResType, AxiosError>(
    [queryKey, params],
    () => fetcher({ api, options: params || {} }).then(({ data }) => data),
    {
      enabled: (!isSearchForm && isEnabled) || !!params,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const paging = usePagination();

  const prevPaging: { page: number; rowsPerPage: number } = usePrevious({
    page: paging.props.page,
    rowsPerPage: paging.props.rowsPerPage,
  });
  useEffect(() => {
    if (data) {
      const { content, pageable, totalElements } = data;
      const { setPage, setCount } = paging;
      setContent(content);
      setCount(totalElements);
      if (pageable) {
        const { pageNumber } = pageable;
        setPage(pageNumber);
      }
    }

    return () => {
      setContent([]);
    };
  }, [data]);

  useEffect(() => {
    const {
      props: { page, rowsPerPage },
    } = paging;
    if (isPaging && prevPaging) {
      if (prevPaging.page !== page || prevPaging.rowsPerPage !== rowsPerPage) {
        setParams((params) => {
          return {
            ...params,
            page,
            size: rowsPerPage,
          };
        });
      }
    }
  }, [paging]);

  useEffect(() => {
    const { pathname } = router;
    if (params && isQueryString) {
      const beforeParams = Object.keys(params).reduce(
        (acc: { [key: string]: any }, cur: string) => {
          if (params[cur] || params[cur] === "") {
            acc[cur] = params[cur];
          }
          return acc;
        },
        {}
      );
      router.replace({
        pathname,
        query: {
          beforeParams: JSON.stringify(beforeParams),
        },
      });
    }
    if (isList) {
      refetch();
    }
  }, [params]);

  useEffect(() => {
    const { query } = router;
    if (query.beforeParams && isQueryString) {
      setParams(JSON.parse(String(query.beforeParams)));
    }
  }, []);

  const onSubmit = function <TParams extends { [key: string]: any }>(
    data: TParams
  ) {
    if (isPaging) {
      const { page, rowsPerPage }: { [key: string]: any } = paging
        ? paging.props
        : {};
      setParams({ ...data, ...(exValues || {}), page, size: rowsPerPage });
    } else {
      setParams({ ...data, ...(exValues || {}) });
    }
  };

  const values = {
    params,
    isLoading,
    isQueryString,
    content,
    setParams,
    paging: isPaging ? paging : null,
    onSubmit,
    isEnabled,
    refetch,
    setContent,
  };
  return (
    <SearchLsitContext.Provider value={values}>
      {children}
    </SearchLsitContext.Provider>
  );
};

export { SearchLsitContext, SearchListProvider };
