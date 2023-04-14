import { useRouter } from "next/router";
import useGetMenuButtons from "@/hooks/useGetMenuButtons";
import React, { useEffect, useState } from "react";
import BUTTON_CONFIG from "@/assets/api/button";
import { useSearchList } from "@/hooks/useSearchList";
import PagingListComp from "../list/PagingListComp";

interface IProps {
  setDisplaySeqState: (payload: any) => void;
  resetRef: any;
}

const NoticePagingListComp = ({ setDisplaySeqState, resetRef }: IProps) => {
  //검색 결과
  const { content } = useSearchList();

  const router = useRouter();
  const { query } = router;

  //버튼 목록
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

  //페이징
  const [totalPagingNum, setTotalPagingNum] = useState<number>(0);

  //공지상세
  const handleLinkCallback = ({
    noticeNo,
    displayTermFixYn,
  }: {
    noticeNo: number;
    displayTermFixYn: string;
  }) => {
    router.push(
      `/customerSatisfaction/notice/detail/${noticeNo}?displayTermFixYn=${displayTermFixYn}`
    );
  };

  //버튼 이벤트 핸들러
  const handleButtonCallback = ({ buttonId }: { buttonId: string }) => {
    if (buttonId === "list-create") {
      router.push({
        pathname: `/customerSatisfaction/notice/write`,
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

  //테이블 컬럼
  const [columns] = useState([
    {
      id: "rowNo",
      label: "번호",
    },
    {
      id: "noticeTitle",
      label: "제목",
      isLink: true,
    },
    {
      id: "noticeTypeName",
      label: "유형",
    },
    {
      id: "noticeTargetName",
      label: "대상",
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
      id: "displayTermFixYn",
      label: "기간설정여부",
    },
    {
      id: "displayStartDatetime",
      label: "노출시작일시",
    },
    {
      id: "displayEndDatetime",
      label: "노출종료일시",
    },
    {
      id: "topFixYn",
      label: "상단노출여부",
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

  //페이징
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

export default NoticePagingListComp;
