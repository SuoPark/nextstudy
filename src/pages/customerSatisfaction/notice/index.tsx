import API_BOARD from "@/assets/api/board";
import { SearchListProvider } from "@/context/SearchListContext";
import { Card, CardContent, Grid } from "@mui/material";
import { useState, useRef } from "react";
import customerSatisfactionOptions from "@/assets/constants/customerSatisfaction";
import commonOptions from "@/assets/constants/common";
import NoticeDisplaySeqDragListComp from "@/components/notice/NoticeDisplaySeqDragListComp";
import NoticePagingListComp from "@/components/notice/NoticePagingListComp";
import RefSearchFomComp from "@/components/search/RefSearchFomComp";

const Notice = () => {
  //표시여부
  const [displaySeqState, setDisplaySeqState] = useState<boolean>(false);

  //검색창 제어
  const resetRef = useRef<any>(null);

  //테이블 column
  const [nodeItems] = useState([
    {
      nodeType: "AUTO_COMPLETE",
      id: "noticeType",
      label: "유형",
      xs: 3,
      nodeOptions: { options: customerSatisfactionOptions.noticeType },
    },
    {
      nodeType: "RADIO",
      id: "useYn",
      xs: 6,
      label: "사용여부",
      nodeOptions: {
        options: [{ label: "전체", value: "" }, ...commonOptions.useYn],
      },
    },
    {
      nodeType: "AUTO_COMPLETE",
      id: "topFixYn",
      label: "최상단 고정 여부",
      xs: 3,
      nodeOptions: { options: customerSatisfactionOptions.topFixYn },
    },
    {
      nodeType: "DATE_RANGE_PICKER",
      id: "createDate",
      label: "등록일",
      xs: 4,
      nodeOptions: { ids: ["createDateFrom", "createDateTo"] },
    },
    {
      nodeType: "TEXT_FIELD",
      id: "noticeTitle",
      label: "제목",
      xs: 6,
    },
    {
      nodeType: "TEXT_FIELD",
      id: "creatorName",
      label: "등록자",
      xs: 6,
    },
  ]);
  console.log("flag", displaySeqState);
  return (
    <SearchListProvider api={API_BOARD.NOTICE_LIST} isEnabled={true}>
      <Grid container rowSpacing={6}>
        {displaySeqState === false && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <RefSearchFomComp
                  ref={resetRef}
                  nodeItems={nodeItems}
                  defaultValues={{ useYn: "", searchType: "all" }}
                />
              </CardContent>
            </Card>
          </Grid>
        )}
        <Grid item xs={12}>
          <Card>
            {displaySeqState === false ? (
              <NoticePagingListComp
                setDisplaySeqState={setDisplaySeqState}
                resetRef={resetRef}
              />
            ) : (
              <NoticeDisplaySeqDragListComp
                setDisplaySeqState={setDisplaySeqState}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </SearchListProvider>
  );
};

export default Notice;
