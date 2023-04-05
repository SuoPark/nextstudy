import { Grid } from "@mui/material";
import { useState } from "react";

import DefaultListComp from "../../list/DefaultListComp";
import { useSearchList } from "@/hooks/useSearchList";
import { dialogsActions } from "@/store/reducers/dialogsReducer";
import { useDispatch } from "react-redux";
import BUTTON_CONFIG from "@/assets/api/button";
import DialogsComp from "../../Dialog/DialogComp";
import OneToOneQuestionEdit from "./edit/[oneToOneQuestionNo]";

const CelebrityOneToOneQuestionComp = () => {
  const dispatch = useDispatch();
  const [oneToOneQuestionColumns] = useState([
    { id: "questionTitle", label: "제목", isLink: true },
    { id: "createDatetime", label: "등록일" },
    { id: "creatorName", label: "등록자" },
  ]);

  const { refetch } = useSearchList();

  const oneToOneQuestionHandler = () => {
    dispatch(dialogsActions.clear({}));
  };

  const handleLinkCallback = ({
    oneToOneQuestionNo,
  }: {
    oneToOneQuestionNo: number;
  }) => {
    dispatch(
      dialogsActions.setDialog({
        id: "oneToOneQuestion",
        comp: (
          <DialogsComp
            id="oneToOneQuestion"
            initialProps={{ scroll: "paper", maxWidth: "lg" }}
            dialogActions={[
              {
                label: "취소",
                fieldProps: BUTTON_CONFIG.BUTTON_CANCEL,
                onClick: () => dispatch(dialogsActions.clear({})),
              },
            ]}
          >
            <OneToOneQuestionEdit
              refetch={refetch}
              oneToOneQuestionHandler={oneToOneQuestionHandler}
              oneToOneQuestionNo={oneToOneQuestionNo}
            />
          </DialogsComp>
        ),
      })
    );
  };

  return (
    <Grid item key="1:1문의 미답변" xs={12} sx={{ pb: 12 }}>
      <DefaultListComp
        columns={oneToOneQuestionColumns}
        handleLinkCallback={handleLinkCallback}
        visibleCheckBox={false}
        isResult={false}
      />
    </Grid>
  );
};

export default CelebrityOneToOneQuestionComp;
