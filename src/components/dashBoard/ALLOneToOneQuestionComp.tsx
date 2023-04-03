import { Grid } from "@mui/material";
import { useState } from "react";

import DefaultListComp from "../list/DefaultListComp";

const CelebrityOneToOneQuestionComp = () => {
  const [oneToOneQuestionColumns] = useState([
    { id: "questionTitle", label: "제목", isLink: true },
    { id: "createDatetime", label: "등록일" },
    { id: "creatorName", label: "등록자" },
  ]);

  return (
    <Grid item key="1:1문의 미답변" xs={12} sx={{ pb: 12 }}>
      <DefaultListComp
        columns={oneToOneQuestionColumns}
        visibleCheckBox={false}
        isResult={false}
      />
    </Grid>
  );
};

export default CelebrityOneToOneQuestionComp;
