// ** MUI Imports
import {
  Button,
  TableCell,
  TableRow,
  Typography,
  Box,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  Paper,
} from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { useSearchList } from "@/hooks/useSearchList";

import useTable from "@/hooks/useTable";
import moment from "moment";
import { styled } from "@mui/material/styles";
import NoDataComp from "../NoDataComp";

// ** Types
// 페이징 기능
// 드래그, 체크, 라디오 이벤트 분리
// isStopLink: true일 경우 영역의 상위 이벤트를 막음
interface IProps<TRowData> {
  columns: {
    id: string;
    label: string;
    tbodyCellFieldProps?: { [key: string]: any };
    theadCellFieldProps?: { [key: string]: any };
    isStopLink?: boolean;
    isLink?: boolean;
    comp?: (payload: { [key: string]: any }, index?: number) => ReactNode;
    dateFormat?: string;
  }[];
  buttons?: {
    buttonId: string;
    buttonDesc?: string;
    fieldProps?: { [key: string]: any };
  }[];
  handleLinkCallback?: (payload: TRowData) => void;
  handleButtonCallback?: ({
    buttonId,
    params,
  }: {
    buttonId: string;
    params: { [key: string]: any } | null;
  }) => void;
  setTotalPagingNum?: (payload: any) => void;
}

const PagingListComp = <TRowData extends { [key: string]: any }>({
  columns,
  buttons,
  handleButtonCallback,
  handleLinkCallback,
  setTotalPagingNum,
}: IProps<TRowData>) => {
  const { content, isLoading, paging, params, setContent } = useSearchList();
  const { rows, setRows } = useTable();

  const StyledLink = styled("a")(({ theme }) => ({
    textDecoration: "underline",
    color: theme.palette.primary.main,
    cursor: "pointer",
  }));

  //테이블 데이터
  useEffect(() => {
    if (content) {
      setRows(content);
    }

    return () => {
      setRows([]);
    };
  }, [content]);

  //페이징 처리
  useEffect(() => {
    if (paging) {
      setTotalPagingNum && setTotalPagingNum(paging.props.count);
    }
  }, [paging]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start", p: 4 }}>
          <Typography variant="subtitle1">
            조회결과 {paging ? paging.props.count : 0}건
          </Typography>
        </Box>
        <TableContainer sx={{ maxHeight: 500, wordBreak: "keep-all" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {columns.map(({ label, theadCellFieldProps }, i) => (
                  <TableCell key={i} align="center" {...theadCellFieldProps}>
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {!isLoading && rows.length > 0 ? (
              <TableBody>
                {rows.map((row, i) => {
                  return (
                    <TableRow
                      key={i}
                      onClick={() =>
                        handleLinkCallback &&
                        handleLinkCallback(row as TRowData)
                      }
                    >
                      {columns.map(
                        (
                          {
                            id,
                            tbodyCellFieldProps,
                            comp,
                            dateFormat,
                            isStopLink,
                            isLink,
                          },
                          ii
                        ) => (
                          <TableCell
                            key={ii}
                            align="center"
                            {...tbodyCellFieldProps}
                            onClick={(event) => {
                              if (isStopLink) {
                                event.stopPropagation();
                              }
                            }}
                          >
                            {(() => {
                              if (comp) {
                                return comp(row, i);
                              } else if (isLink) {
                                return (
                                  <StyledLink
                                    onClick={() => {
                                      handleLinkCallback &&
                                        handleLinkCallback(row as TRowData);
                                    }}
                                  >
                                    {dateFormat
                                      ? moment(row[id]).format(dateFormat)
                                      : row[id]}
                                  </StyledLink>
                                );
                              } else if (dateFormat) {
                                return moment(row[id]).format(dateFormat);
                              }
                              return row[id];
                            })()}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={columns.length}>
                    <NoDataComp>목록이 없습니다.</NoDataComp>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {paging && <TablePagination component="div" {...paging.props} />}
        {buttons && buttons.length > 0 && (
          <Stack
            direction="row"
            spacing={2}
            pl={5}
            pb={5}
            justifyContent={"flex-start"}
          >
            {buttons.map(({ buttonId, buttonDesc, fieldProps = {} }, i) => (
              <Button
                key={i}
                size="small"
                onClick={() =>
                  handleButtonCallback &&
                  handleButtonCallback({ buttonId, params })
                }
                {...fieldProps}
              >
                {buttonDesc}
              </Button>
            ))}
          </Stack>
        )}
      </Paper>
    </>
  );
};

export default PagingListComp;
