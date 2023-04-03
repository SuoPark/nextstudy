// ** MUI Imports
import {
  Button,
  TableCell,
  TableRow,
  Typography,
  Box,
  Checkbox,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  Paper,
  Radio,
} from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { useSearchList } from "@/hooks/useSearchList";
import NoDataComp from "../NoDataComp";
import { styled } from "@mui/material/styles";

import moment from "moment";
import useTable from "@/hooks/useTable";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

// ** Types
interface IProps<TRowData> {
  columns: {
    id: string;
    label: string;
    tbodyCellFieldProps?: { [key: string]: any };
    theadCellFieldProps?: { [key: string]: any };
    isLink?: boolean;
    comp?: (payload: { [key: string]: any }) => ReactNode;
    dateFormat?: string;
  }[];
  buttons?: {
    buttonId: string;
    buttonDesc?: string;
    fieldProps?: { [key: string]: any };
  }[];
  visibleCheckBox?: boolean;
  visibleRadio?: boolean;
  isLineClick?: boolean;
  isDrag?: boolean;
  isResult?: boolean;
  handleButtonCallback?: ({
    buttonId,
    params,
  }: {
    buttonId: string;
    params: { [key: string]: any } | null;
  }) => void;
  handleCheckedCallback?: (payload: TRowData[]) => void;
  handleLinkCallback?: (payload: TRowData) => void;
  maxHeight?: number;
  minHeight?: number;
  isPaging?: boolean; // 페이징 UI 숨김처리
  buttonStyle?: any;
  isHighLight?: boolean;
}

const DefaultListComp = <TRowData extends { [key: string]: any }>({
  columns,
  buttons,
  visibleCheckBox = false,
  visibleRadio = false,
  isLineClick = false,
  isDrag = false,
  isResult = true,
  handleButtonCallback,
  handleCheckedCallback,
  handleLinkCallback,
  maxHeight = 10000,
  minHeight = 300,
  isPaging = true,
  buttonStyle,
  isHighLight = false,
}: IProps<TRowData>) => {
  const { content, isLoading, paging, params, setContent } = useSearchList();

  const {
    rows,
    selected,
    setSelected,
    setRows,
    handleAllSelect,
    handleSelect,
    droppableId,
    handleRadioSelect,
  } = useTable();

  const StyledLink = styled("a")(({ theme }) => ({
    textDecoration: "underline",
    color: theme.palette.primary.main,
    cursor: "pointer",
  }));
  useEffect(() => {
    if (content) {
      setRows(content);
    }

    return () => {
      setRows([]);
      setSelected([]);
    };
  }, [content]);

  useEffect(() => {
    if (handleCheckedCallback) {
      handleCheckedCallback(selected as TRowData[]);
    }
  }, [selected]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...rows];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setContent(items);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {isResult && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", p: 4 }}>
            <Typography variant="subtitle1">
              조회결과 {paging ? paging.props.count : 0}건
            </Typography>
          </Box>
        )}
        <TableContainer
          sx={{
            maxHeight: maxHeight,
            minHeight: minHeight,
            wordBreak: "keep-all",
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {!visibleRadio && visibleCheckBox && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        rows.length > 0 && selected.length === rows.length
                      }
                      onChange={handleAllSelect}
                    />
                  </TableCell>
                )}
                {visibleRadio && !visibleCheckBox && (
                  <TableCell padding="checkbox" />
                )}
                {columns.map(({ label, theadCellFieldProps }, i) => (
                  <TableCell key={i} align="center" {...theadCellFieldProps}>
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {!isLoading &&
              (rows.length > 0 ? (
                <DragDropContext
                  onDragEnd={handleDragEnd}
                  enableDefaultSensors={isDrag}
                >
                  <Droppable droppableId={droppableId}>
                    {(provided) => (
                      <TableBody
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {rows.map((row, i) => {
                          const isChecked = !!selected.find(
                            (item) => item === row
                          );
                          return (
                            <Draggable
                              key={i}
                              draggableId={`tableId${i}`}
                              index={i}
                            >
                              {(provided) => (
                                <TableRow
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  hover
                                  selected={isChecked}
                                  aria-checked={isChecked}
                                  onClick={() => {
                                    if (isHighLight) {
                                      setSelected([row as TRowData]);
                                    }
                                    isLineClick &&
                                      handleLinkCallback &&
                                      handleLinkCallback(row as TRowData);
                                  }}
                                  sx={
                                    isLineClick
                                      ? {
                                          cursor: "pointer",
                                        }
                                      : {}
                                  }
                                >
                                  {!visibleRadio && visibleCheckBox && (
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        checked={isChecked}
                                        onChange={(event) =>
                                          handleSelect({ event, row })
                                        }
                                      />
                                    </TableCell>
                                  )}
                                  {visibleRadio && !visibleCheckBox && (
                                    <TableCell padding="checkbox">
                                      <Radio
                                        size="small"
                                        checked={isChecked}
                                        name="table-row-radio"
                                        onChange={(event) =>
                                          handleRadioSelect({ event, row })
                                        }
                                      />
                                    </TableCell>
                                  )}
                                  {columns.map(
                                    (
                                      {
                                        id,
                                        tbodyCellFieldProps,
                                        isLink,
                                        comp,
                                        dateFormat,
                                      },
                                      ii
                                    ) => (
                                      <TableCell
                                        key={ii}
                                        align="center"
                                        {...tbodyCellFieldProps}
                                      >
                                        {(() => {
                                          if (!isLineClick && isLink && comp) {
                                            return (
                                              <StyledLink
                                                onClick={() => {
                                                  handleLinkCallback &&
                                                    handleLinkCallback(
                                                      row as TRowData
                                                    );
                                                }}
                                              >
                                                {comp(row)}
                                              </StyledLink>
                                            );
                                          } else if (comp) {
                                            return comp(row);
                                          } else if (!isLineClick && isLink) {
                                            return (
                                              <StyledLink
                                                onClick={() => {
                                                  handleLinkCallback &&
                                                    handleLinkCallback(
                                                      row as TRowData
                                                    );
                                                }}
                                              >
                                                {dateFormat
                                                  ? moment(row[id]).format(
                                                      dateFormat
                                                    )
                                                  : row[id]}
                                              </StyledLink>
                                            );
                                          } else if (dateFormat) {
                                            return moment(row[id]).format(
                                              dateFormat
                                            );
                                          }

                                          return row[id];
                                        })()}
                                      </TableCell>
                                    )
                                  )}
                                </TableRow>
                              )}
                            </Draggable>
                          );
                        })}
                      </TableBody>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={
                        visibleCheckBox || visibleRadio
                          ? columns.length + 1
                          : columns.length
                      }
                    >
                      <NoDataComp>목록이 없습니다.</NoDataComp>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </TableContainer>
        {isPaging && paging && (
          <TablePagination component="div" {...paging.props} />
        )}
        {buttons && buttons.length > 0 && (
          <Stack
            direction="row"
            spacing={2}
            pl={5}
            pb={5}
            justifyContent={"flex-start"}
            sx={{ mt: isPaging ? "10px" : "50px" }}
          >
            {buttons.map(({ buttonId, buttonDesc, fieldProps = {} }, i) => (
              <Button
                key={i}
                size="small"
                style={buttonStyle}
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

export default DefaultListComp;
