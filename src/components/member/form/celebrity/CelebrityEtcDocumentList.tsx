import React, { useEffect, useState } from "react";
import {
  Button,
  CardContent,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import FileUploadComp from "@/components/common/FileUploadComp";

interface ICelebrityEtcDocumentInfo {
  celebrityEtcDocumentNo?: number;
  documentName: string;
  filePath: string;
  realFileName?: string;
}

interface IProps {
  etc: ICelebrityEtcDocumentInfo[];
  callbackEtc: (payload: any[]) => void;
  disabled?: boolean;
}

const CelebrityEtcDocumentList = ({ etc, callbackEtc, disabled }: IProps) => {
  const [celebrityEtcDocumentList, setCelebrityEtcDocumentList] = useState<
    ICelebrityEtcDocumentInfo[]
  >(etc || []);

  const changeCelebrityEtcHandler = (e: any, index: number, id: string) => {
    let etc: ICelebrityEtcDocumentInfo[] = celebrityEtcDocumentList.filter(
      (_, i) => i === index
    );
    if (id === "filePath") {
      etc = [
        {
          ...etc[0],
          filePath: e,
        },
      ];
    } else {
      etc = [
        {
          ...etc[0],
          documentName: e.target.value,
        },
      ];
    }

    setCelebrityEtcDocumentList((celebrityEtcDocumentList) =>
      celebrityEtcDocumentList.map(
        (etcDocument: ICelebrityEtcDocumentInfo, i: number) => {
          if (i === index) {
            return {
              ...etc[0],
            };
          } else {
            return etcDocument;
          }
        }
      )
    );
  };

  const AddCelebrityEtcDocument = () => {
    setCelebrityEtcDocumentList((prevState) => [
      ...prevState,
      { documentName: "", filePath: "" },
    ]);
  };

  const DeleteEtcDocument = (index: number) => {
    setCelebrityEtcDocumentList(
      celebrityEtcDocumentList.filter((etcDocumentList, idx) => idx !== index)
    );
  };

  useEffect(() => {
    callbackEtc(celebrityEtcDocumentList);
  }, [celebrityEtcDocumentList]);

  return (
    <CardContent>
      <TableContainer>
        <Table>
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "90%" }} />
            <col />
          </colgroup>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} sx={{ border: "none" }}>
                {disabled && (
                  <Button
                    sx={{ float: "right" }}
                    variant={"contained"}
                    style={{ color: "rgba(58, 53, 65, 0.68)" }}
                    disabled={disabled}
                    size="small"
                    onClick={AddCelebrityEtcDocument}
                  >
                    추가
                  </Button>
                )}
                {!disabled && (
                  <Button
                    style={{ float: "right", color: "white" }}
                    variant={"contained"}
                    disabled={disabled}
                    size="small"
                    onClick={AddCelebrityEtcDocument}
                  >
                    추가
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component={"th"}>
                <FormLabel>추가서류</FormLabel>
              </TableCell>
              <TableCell colSpan={1}>
                {celebrityEtcDocumentList.map(
                  (etc: ICelebrityEtcDocumentInfo, index: number) => {
                    return (
                      <Table key={index}>
                        <colgroup>
                          <col style={{ width: "40%" }} />
                          <col style={{ width: "30%" }} />
                          <col style={{ width: "10%" }} />
                          <col style={{ width: "20%" }} />
                          <col />
                        </colgroup>
                        <TableBody>
                          <TableRow>
                            <TableCell colSpan={1} sx={{ border: "none" }}>
                              <TextField
                                value={etc.documentName || ""}
                                onChange={(e) =>
                                  changeCelebrityEtcHandler(
                                    e,
                                    index,
                                    "documentName"
                                  )
                                }
                                size="small"
                                fullWidth
                                disabled={disabled}
                              />
                            </TableCell>
                            <TableCell colSpan={1} sx={{ border: "none" }}>
                              <FileUploadComp
                                buttonStyle={{
                                  width: "140px",
                                  marginTop: "25px",
                                }}
                                uploadIcon
                                attachedFiles={etc.filePath}
                                thumbNail={true}
                                handleChange={(files: any) =>
                                  changeCelebrityEtcHandler(
                                    files,
                                    index,
                                    "filePath"
                                  )
                                }
                                disabled={disabled}
                              >
                                이미지 업로드
                              </FileUploadComp>
                            </TableCell>
                            <TableCell colSpan={1} sx={{ border: "none" }}>
                              {disabled && (
                                <Button
                                  sx={{ width: "73px" }}
                                  disabled={disabled}
                                  style={{ color: "rgba(58, 53, 65, 0.68)" }}
                                  size="small"
                                  variant={"contained"}
                                  onClick={() => {
                                    DeleteEtcDocument(index);
                                  }}
                                >
                                  삭제
                                </Button>
                              )}
                              {!disabled && (
                                <Button
                                  style={{ width: "73px", color: "white" }}
                                  disabled={disabled}
                                  size="small"
                                  variant={"contained"}
                                  onClick={() => {
                                    DeleteEtcDocument(index);
                                  }}
                                >
                                  삭제
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    );
                  }
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  );
};
export default CelebrityEtcDocumentList;
