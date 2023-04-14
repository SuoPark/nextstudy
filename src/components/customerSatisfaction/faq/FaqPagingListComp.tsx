import { useRouter } from "next/router";
import useGetMenuButtons from "@/hooks/useGetMenuButtons";
import React, { useEffect, useState } from "react";
import PagingListComp from "@/components/list/PagingListComp";
import { useSearchList } from "@/hooks/useSearchList";
import BUTTON_CONFIG from "@/assets/api/button";

interface IProps {
  setDisplaySeqState: (payload: any) => void;
  resetRef: any;
}

const FaqPagingListComp = ({ setDisplaySeqState, resetRef }: IProps) => {
  const { content } = useSearchList();

  const router = useRouter();
  const { query } = router;

  const listButtons = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "list-create",
        buttonDesc: "등록",
        fieldProps: {
          ...BUTTON_CONFIG.BUTTON_CREATE,
        },
      },
      {
        buttonId: "displaySeq-change",
        buttonDesc: "전시순서변경",
        fieldProps: {
          ...BUTTON_CONFIG.BUTTON_CREATE,
        },
      },
    ],
  });

  const [totalPagingNum, setTotalPagingNum] = useState<number>(0);

  const handleLinkCallback = ({ faqNo }: { faqNo: number }) => {
    router.push({
      pathname: `/customerSatisfaction/faq/detail/${faqNo}`,
      query,
    });
  };

  const handleButtonCallback = ({ buttonId }: { buttonId: string }) => {
    if (buttonId === "list-create") {
      router.push({
        pathname: `/customerSatisfaction/faq/write`,
        query: {
          ...query,
          totalPagingNum: totalPagingNum,
        },
      });
    } else if (buttonId === "displaySeq-change") {
      resetRef.current.displaySeqParamsReset();
      setDisplaySeqState(true);
    }
  };

  const [columns] = useState([
    {
      id: "rowNo",
      label: "번호",
    },
    {
      id: "faqTypeName",
      label: "유형",
    },
    {
      id: "faqTitle",
      label: "제목",
      isLink: true,
    },
    {
      id: "displaySeq",
      label: "정렬순서",
    },
    {
      id: "useYn",
      label: "사용여부",
    },
    {
      id: "creatorName",
      label: "등록자",
    },
    {
      id: "createDatetime",
      label: "등록일",
    },
    {
      id: "modifierName",
      label: "변경자",
    },
    {
      id: "modifyDatetime",
      label: "변경일",
    },
  ]);

  useEffect(() => {
    if (content && content.length > 0) {
      setTotalPagingNum(content[0].displaySeq);
    }
  }, [content]);

  return (
    <PagingListComp
      columns={columns}
      buttons={listButtons.buttons}
      handleLinkCallback={handleLinkCallback}
      handleButtonCallback={handleButtonCallback}
    />
  );
};

export default FaqPagingListComp;
