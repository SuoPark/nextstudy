import { useSearchList } from "@/hooks/useSearchList";
import React, { useEffect, useState } from "react";
import useGetMenuButtons from "@/hooks/useGetMenuButtons";
import fetcher from "@/utils/fetcher";
import API_BOARD from "@/assets/api/board";
import toast from "react-hot-toast";

import BUTTON_CONFIG from "@/assets/api/button";
import DefaultListComp from "../list/DefaultListComp";

interface IProps {
  setDisplaySeqState: (payload: boolean) => void;
}

const NoticeDisplaySeqDragListComp = ({ setDisplaySeqState }: IProps) => {
  const { content, paging, setContent, refetch } = useSearchList();
  const [defaultDisplaySeq, SetDefaultDisplaySeq] = useState<number>();
  const [defaultRow, SetDefaultRow] = useState<any[]>([]);

  useEffect(() => {
    if (content && content.length > 0) {
      SetDefaultRow(content);
    }
  }, [content]);

  useEffect(() => {
    if (content && content.length > 0) {
      SetDefaultDisplaySeq(content[0].displaySeq);
    }
  }, [paging]);

  const dragListButtons = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "displaySeq-save",
        buttonDesc: "노출순서저장",
        fieldProps: {
          ...BUTTON_CONFIG.BUTTON_SERVICE,
        },
      },
      {
        buttonId: "displaySeq-cancel",
        buttonDesc: "전시순서취소",
        fieldProps: {
          ...BUTTON_CONFIG.BUTTON_CANCEL,
        },
      },
    ],
  });

  const handleButtonCallback = ({ buttonId }: { buttonId: string }) => {
    if (buttonId === "displaySeq-save") {
      let displaySeq = defaultDisplaySeq;
      const param = content.map((row: any) => {
        let reRow = {};
        if (displaySeq && displaySeq > 0) {
          reRow = {
            noticeNo: row.noticeNo,
            displaySeq: displaySeq,
          };
          displaySeq--;
        }
        return reRow;
      });
      displaySeqHandler(param);
    } else if (buttonId === "displaySeq-cancel") {
      if (defaultRow && defaultRow.length > 0) setContent(defaultRow);
      setDisplaySeqState(false);
    }
  };

  const displaySeqHandler = async (param: any) => {
    await fetcher({
      api: API_BOARD.NOTICE_DISPLAY_SEQ_UPDATE,
      options: param,
    })
      .then((r) => {
        if (r.status === 200) {
          toast.success("전시 순서 변경되었습니다.");
          refetch();
          setDisplaySeqState(false);
        } else {
          toast.error(r.data.message);
        }
      })
      .catch((error: any) => {
        toast.error(error);
      });
  };

  const [dragColumns] = useState([
    {
      id: "rowNo",
      label: "번호",
    },
    {
      id: "noticeTitle",
      label: "제목",
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

  return (
    <DefaultListComp
      columns={dragColumns}
      isDrag={true}
      buttons={dragListButtons.buttons}
      handleButtonCallback={handleButtonCallback}
      isPaging={false}
    />
  );
};

export default NoticeDisplaySeqDragListComp;
