import { Card, CardHeader } from "@mui/material";
import SellerEtcDocumentList from "./SellerEtcDocumentList";
import { useState, useEffect } from "react";

interface IProps {
  initDoc: any;
  setValue: any;
  disabled: boolean | undefined;
}

interface IEtcDocumentInfo {
  sellerEtcDocumentNo: number;
  documentName: string;
  filePath: string;
  realFileName: string;
}

const SellerEtcDocument = ({ initDoc, setValue, disabled }: IProps) => {
  //기타 증빙서류
  const [etcDocumentList, setEtcDocumentList] =
    useState<IEtcDocumentInfo[]>(initDoc);

  //증빙서류 form 업데이트
  useEffect(() => {
    setValue("etcDocumentList", etcDocumentList);
  }, [etcDocumentList]);
  return (
    <Card sx={{ mt: "10px" }}>
      <CardHeader
        title="기타 증빙서류 정보"
        titleTypographyProps={{ variant: "h6" }}
        sx={{ mt: "5px" }}
      />
      <SellerEtcDocumentList
        etc={etcDocumentList}
        callbackEtc={setEtcDocumentList}
        disabled={disabled}
      />
    </Card>
  );
};

export default SellerEtcDocument;
