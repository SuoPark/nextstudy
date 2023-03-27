import QUERY_KEYS from "@/assets/constants/queries";
import { IApi } from "@/type/common";
import fetcher from "@/utils/fetcher";
import axios, { AxiosError } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
interface IProps {
  children: ReactNode;
  api: IApi;
  queryKey?: string;
  isQueryString: boolean;
}

export interface IValueType {
  content: { [key: string]: any }[];
  isLoading: boolean;
  refetch: () => void;
  setContent: (content: { [key: string]: any }[]) => void;
  isQueryString: boolean;
}

interface IResType {
  content: { [key: string]: any }[];
}

// ** Defaults
const defaultProvider: IValueType = {
  content: [],
  isLoading: false,
  refetch: () => null,
  setContent: () => null,
  isQueryString: true,
};

const SearchLsitContext = createContext(defaultProvider);

const SearchListProvider = ({
  children,
  api,
  queryKey,
  isQueryString,
}: IProps) => {
  const [params, setParams] = useState<{ [key: string]: any } | null>(null);
  const [content, setContent] = useState<{ [key: string]: any }[]>([]);
  // const { data, isLoading, refetch } = useQuery<IResType, AxiosError>(
  //   [queryKey || api.url || QUERY_KEYS.SAMPLE_LIST1, params],
  //   () =>
  //     fetcher({ api, options: params || {} }).then(({ data }) => {
  //       return data.data;
  //     }),
  //   {
  //     enabled: !!params,
  //     refetchOnWindowFocus: true,
  //     refetchOnMount: true,
  //   }
  // );
  async function ssss() {
    console.log("@");
    return await axios.get(api.url).then(({ data }) => data.data);
  }
  const { data, isLoading, refetch } = useQuery<IResType, AxiosError>(
    [queryKey || api.url || QUERY_KEYS.SAMPLE_LIST1, params],
    () => ssss().then((data) => data.data),
    {
      enabled: !!params,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    }
  );
  useEffect(() => {
    if (data) {
      const { content } = data;
      setContent(content);
    }

    return () => {
      setContent([]);
    };
  }, [data]);

  const values = {
    isLoading,
    content,
    refetch,
    setContent,
    isQueryString,
  };
  return (
    <SearchLsitContext.Provider value={values}>
      {children}
    </SearchLsitContext.Provider>
  );
};

export { SearchLsitContext, SearchListProvider };
