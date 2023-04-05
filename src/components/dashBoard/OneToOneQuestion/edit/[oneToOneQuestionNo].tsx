import API_BOARD from "@/assets/api/board";
import QUERY_KEYS from "@/assets/constants/queries";
import fetcher from "@/utils/fetcher";
import { Button } from "@mui/material";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { useMutation, QueryClient, dehydrate } from "react-query";
import BUTTON_CONFIG from "@/assets/api/button";
import {
  fetchOneToOneQuestionDetail,
  useOneToOneQuestionDetail,
} from "@/hooks/queries/useBoard";
import toast from "react-hot-toast";
import useGetMenuButtons from "@/hooks/useGetMenuButtons";

interface IProps {
  oneToOneQuestionNo: any;
  oneToOneQuestionHandler: any;
  refetch: any;
}

const OneToOneQuestionEdit: NextPage<IProps> = ({
  oneToOneQuestionNo,
  oneToOneQuestionHandler,
  refetch,
}) => {
  const { data, isLoading } = useOneToOneQuestionDetail(
    { oneToOneQuestionNo },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const { mutate } = useMutation(async (options: any) => {
    const { url, method } = API_BOARD.ONE_TO_ONE_QUESTION_ANSWER_PUT;
    const { oneToOneQuestionNo } = options;

    await fetcher({
      api: {
        url: `${url}/${oneToOneQuestionNo}`,
        method,
      },
      options,
    });
  });

  const onSubmit = (params: any) => {
    mutate(params, {
      onSuccess: (data) => {
        toast.success("성공");
        oneToOneQuestionHandler();
        refetch();
      },
      onError: (error: any) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        toast.error(message);
      },
    });
  };

  const { buttons } = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "view-create",
        buttonDesc: "답변등록",
        fieldProps: {
          ...BUTTON_CONFIG.BUTTON_UPDATE,
          ...BUTTON_CONFIG.BUTTON_TYPE_SUBMIT,
        },
      },
    ],
  });

  return (
    // <FormComp onSubmit={onSubmit} detailData={data || null}>
    //   {buttons.map(({ buttonId, buttonDesc, fieldProps }) => (
    //     <Button key={buttonId} {...fieldProps}>
    //       {buttonDesc}
    //     </Button>
    //   ))}
    // </FormComp>
    <></>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { oneToOneQuestionNo } = params || {};

  if (oneToOneQuestionNo) {
    await queryClient.prefetchQuery(
      [QUERY_KEYS.ONE_TO_ONE_QUESTION_DETAIL, String(oneToOneQuestionNo)],
      () =>
        fetchOneToOneQuestionDetail({
          oneToOneQuestionNo: String(oneToOneQuestionNo),
        })
    );
  }

  return {
    props: {
      oneToOneQuestionNo: String(oneToOneQuestionNo),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default OneToOneQuestionEdit;
