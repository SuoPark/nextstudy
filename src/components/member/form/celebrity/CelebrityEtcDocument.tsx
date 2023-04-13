import { CardHeader } from "@mui/material";
import { Card } from "mdi-material-ui";
import CelebrityEtcDocumentList from "./CelebrityEtcDocumentList";
import { useState, useEffect } from "react";

interface IProps {
  initDoc: any;
  setValue: any;
  disabled: boolean | undefined;
}

interface ICelebrityEtcDocumentInfo {
  celebrityEtcDocumentNo: number;
  documentName: string;
  filePath: string;
  realFileName: string;
}

const CelebrityEtcDocument = ({ initDoc, setValue, disabled }: IProps) => {
  const [celebrityEtcDocumentList, setCelebrityEtcDocumentList] =
    useState<ICelebrityEtcDocumentInfo[]>(initDoc);

  useEffect(() => {
    setValue("celebrityEtcDocumentList", celebrityEtcDocumentList);
  }, [celebrityEtcDocumentList]);
  return (
    <Card sx={{ mt: "10px" }}>
      <CardHeader
        title="기타 증빙서류 정보"
        titleTypographyProps={{ variant: "h6" }}
        sx={{ mt: "5px" }}
      />
      <CelebrityEtcDocumentList
        etc={celebrityEtcDocumentList}
        callbackEtc={setCelebrityEtcDocumentList}
        disabled={disabled}
      />
    </Card>
  );
};
export default CelebrityEtcDocument;
