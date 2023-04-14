import React, { useRef, useState } from "react";
import customerSatisfactionOptions from "@/assets/constants/customerSatisfaction";
import commonOptions from "@/assets/constants/common";
import { SearchListProvider } from "@/context/SearchListContext";
import API_BOARD from "@/assets/api/board";
import { Card, CardContent, Grid } from "@mui/material";
import RefSearchFomComp from "@/components/search/RefSearchFomComp";
import FaqDisplaySeqDragListComp from "@/components/customerSatisfaction/faq/FaqDisplaySeqDragListComp";
import FaqPagingListComp from "@/components/customerSatisfaction/faq/FaqPagingListComp";

const FaqPage = () => {
  const [displaySeqState, setDisplaySeqState] = useState<boolean>(false);

  const resetRef = useRef<any>(null);

  const [nodeItems] = useState([
    {
      nodeType: "AUTO_COMPLETE",
      id: "faqType",
      label: "유형",
      xs: 3,
      nodeOptions: { options: customerSatisfactionOptions.faqType },
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
      nodeType: "DATE_RANGE_PICKER",
      id: "createDate",
      label: "등록일자",
      xs: 6,
      nodeOptions: { ids: ["createDateFrom", "createDateTo"] },
    },
    {
      nodeType: "TEXT_FIELD",
      id: "faqTitle",
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

  return (
    <SearchListProvider api={API_BOARD.FAQ_LIST} isEnabled={true}>
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
              <FaqPagingListComp
                setDisplaySeqState={setDisplaySeqState}
                resetRef={resetRef}
              />
            ) : (
              <FaqDisplaySeqDragListComp
                setDisplaySeqState={setDisplaySeqState}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </SearchListProvider>
  );
};

export default FaqPage;
