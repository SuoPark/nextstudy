import DefaultListComp from "@/components/list/DefaultListComp";
import { useSearchList } from "@/hooks/useSearchList";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CustomerOneToOneQuestionComp = () => {
  // const dispatch = useDispatch();
  const [oneToOneQuestionColumns] = useState([
    { id: "questionTitle", label: "제목", isLink: true },
    { id: "createDatetime", label: "등록일" },
    { id: "creatorName", label: "등록자" },
  ]);

  // const { refetch } = useSearchList();

  // const oneToOneQuestionHandler = () => {
  //   dispatch(dialogsActions.clear({}));
  // };

  // const handleLinkCallback = ({
  //   oneToOneQuestionNo,
  // }: {
  //   oneToOneQuestionNo: number;
  // }) => {
  //   dispatch(
  //     dialogsActions.setDialog({
  //       id: "oneToOneQuestion",
  //       comp: (
  //         <DialogsComp
  //           id="oneToOneQuestion"
  //           initialProps={{ scroll: "paper", maxWidth: "lg" }}
  //           dialogActions={[
  //             {
  //               label: "취소",
  //               fieldProps: BUTTON_CONFIG.BUTTON_CANCEL,
  //               onClick: () => dispatch(dialogsActions.clear({})),
  //             },
  //           ]}
  //         >
  //           <OneToOneQuestionEdit
  //             refetch={refetch}
  //             oneToOneQuestionHandler={oneToOneQuestionHandler}
  //             oneToOneQuestionNo={oneToOneQuestionNo}
  //           />
  //         </DialogsComp>
  //       ),
  //     })
  //   );
  // };

  return (
    <Grid item key="1:1문의 미답변" xs={12}>
      <DefaultListComp
        columns={oneToOneQuestionColumns}
        // handleLinkCallback={handleLinkCallback}5
        minHeight={550}
        maxHeight={550}
        visibleCheckBox={false}
        isResult={false}
      />
    </Grid>
  );
};

export default CustomerOneToOneQuestionComp;
