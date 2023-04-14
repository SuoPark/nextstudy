// ** Third Party Import
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Tab,
  TabProps,
} from "@mui/material";
import { IOptions } from "@/types/common";
import { useSearchList } from "@/hooks/useSearchList";
import DatePickerWrapper from "../common/DatePickerWrapper";
import DatePicker from "react-datepicker";
import { TabContext, TabList } from "@mui/lab";
import React, {
  forwardRef,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
} from "react";
import { useRouter } from "next/router";
import CategorysComp from "../common/CategorysComp";

// ** Types
interface IDatePickerType {
  ids: string[];
  format?: string;
}
interface IRadioType {
  options: IOptions[];
}

interface ICheckBoxType {
  options: IOptions[];
}

interface IAutoCompleteType {
  options: IOptions[];
}

interface IComplexType {
  childNode: INodeItem[];
}

interface ITabType {
  options: TabProps[];
  mb?: number;
  isClear?: boolean;
  isSubmit: boolean;
}
interface ICategorysType {
  ids: string[];
}

interface INodeItem {
  nodeType:
    | "DATE_PICKER"
    | "DATE_RANGE_PICKER"
    | "RADIO"
    | "AUTO_COMPLETE"
    | "TEXT_FIELD"
    | "COMPLEX"
    | "CHECK_BOX"
    | "TAB"
    | string;
  id: string;
  label?: string;
  xs?: number;
  nodeOptions?:
    | IDatePickerType
    | IRadioType
    | ICheckBoxType
    | IAutoCompleteType
    | IComplexType
    | ITabType
    | ICategorysType;
}

interface IProps {
  nodeItems: INodeItem[];
  isDisabled?: boolean;
  defaultValues?: { [key: string]: any };
}

// 서치폼에 forwardRef 적용 사이드 이펙트 우려로 서치폼 하나더 만들었음
const RefSearchFomComp = forwardRef(
  ({ nodeItems, isDisabled = false, defaultValues }: IProps, ref) => {
    // ** Hooks
    const { control, reset, getValues, handleSubmit } = useForm({
      defaultValues,
    });
    const { onSubmit, params, isEnabled, isQueryString } = useSearchList();
    const router = useRouter();

    //item에따라 컴포넌트 렌더
    const renderNodeItem = (items: INodeItem[]) => {
      return items.map(({ nodeType, id, label, xs, nodeOptions }, i) => {
        if (nodeType === "DATE_PICKER") {
          const { format = "YYYYMMDD" } = (nodeOptions ||
            {}) as IDatePickerType;
          return (
            <Grid key={i} item xs={xs || 12}>
              <Controller
                name={id}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <DatePickerWrapper>
                    <DatePicker
                      selected={value ? new Date(moment(value).format()) : null}
                      disabled={isDisabled}
                      onChange={(date: Date) => {
                        if (date) {
                          onChange(moment(date).format(format));
                        }
                      }}
                      customInput={
                        <TextField
                          label={label}
                          name={name}
                          fullWidth
                          size="small"
                        />
                      }
                    />
                  </DatePickerWrapper>
                )}
              />
            </Grid>
          );
        } else if (nodeType === "DATE_RANGE_PICKER") {
          return (
            <Grid key={i} item xs={xs || 12}>
              <Controller
                name={id}
                control={control}
                render={({ field: { name, value, onChange } }) => {
                  const [start, end] = value || [];
                  const startDate = start
                    ? new Date(moment(start).format())
                    : null;
                  const endDate = end ? new Date(moment(end).format()) : null;
                  const { format = "YYYYMMDD" } = (nodeOptions ||
                    {}) as IDatePickerType;
                  return (
                    <DatePickerWrapper>
                      <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selectsRange
                        monthsShown={2}
                        endDate={endDate}
                        selected={startDate}
                        startDate={startDate}
                        disabled={isDisabled}
                        onChange={(dates: any) => {
                          onChange(
                            dates.map((date: Date | null) => {
                              if (date) {
                                return moment(date).format(format);
                              }
                              return null;
                            })
                          );
                        }}
                        customInput={
                          <TextField
                            label={label}
                            name={name}
                            fullWidth
                            size="small"
                          />
                        }
                      />
                    </DatePickerWrapper>
                  );
                }}
              />
            </Grid>
          );
        } else if (nodeType === "TEXT_FIELD") {
          return (
            <Grid key={i} item xs={xs || 12}>
              <Controller
                name={id}
                control={control}
                render={({ field: { name, value, onChange } }) => {
                  return (
                    <TextField
                      label={label}
                      name={name}
                      value={value || ""}
                      onChange={onChange}
                      size="small"
                      fullWidth
                      disabled={isDisabled}
                    />
                  );
                }}
              />
            </Grid>
          );
        } else if (nodeType === "RADIO") {
          const { options } = nodeOptions as IRadioType;
          return (
            <Grid key={i} item xs={xs || 12}>
              <Controller
                name={id}
                control={control}
                render={({ field: { name, value, onChange } }) => {
                  return (
                    <Stack direction="row" spacing={5} alignItems="center">
                      <Typography>{label}</Typography>
                      <RadioGroup
                        row
                        name={name}
                        value={value || ""}
                        onChange={onChange}
                      >
                        {(options || []).map((opt, ii) => (
                          <FormControlLabel
                            name={name}
                            key={ii}
                            value={opt.value}
                            control={<Radio />}
                            label={opt.label}
                            disabled={isDisabled}
                          />
                        ))}
                      </RadioGroup>
                    </Stack>
                  );
                }}
              />
            </Grid>
          );
        } else if (nodeType === "CHECK_BOX") {
          const { options } = nodeOptions as ICheckBoxType;
          return (
            <Grid key={i} item xs={xs || 12}>
              <Controller
                name={id}
                control={control}
                render={({ field: { name, value = [], onChange } }) => {
                  return (
                    <Stack direction="row" spacing={5} alignItems="center">
                      <Typography>{label}</Typography>
                      <FormGroup row>
                        {(options || []).map((opt, ii) => (
                          <FormControlLabel
                            key={ii}
                            name={name}
                            disabled={isDisabled}
                            control={
                              <Checkbox
                                value={opt.value}
                                checked={(() => {
                                  if (getValues()[name]) {
                                    return getValues()[name].includes(
                                      opt.value
                                    );
                                  }
                                  return false;
                                })()}
                                onChange={(e) => {
                                  const { target } = e;
                                  if (target.checked) {
                                    onChange([...value, target.value]);
                                  } else {
                                    onChange(
                                      value.filter(
                                        (val: any) => val !== target.value
                                      )
                                    );
                                  }
                                }}
                                name={name}
                              />
                            }
                            {...opt}
                          />
                        ))}
                      </FormGroup>
                    </Stack>
                  );
                }}
              />
            </Grid>
          );
        } else if (nodeType === "AUTO_COMPLETE") {
          const { options } = nodeOptions as IAutoCompleteType;
          return (
            <Grid key={i} item xs={xs || 12}>
              <Controller
                name={id}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <Autocomplete
                    options={options || []}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, newValue) => onChange(newValue?.value)}
                    value={
                      (options || []).find((opt) => opt.value === value) || null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={label}
                        name={name}
                        fullWidth
                      />
                    )}
                    size="small"
                    disabled={isDisabled}
                  />
                )}
              />
            </Grid>
          );
        } else if (nodeType === "TAB") {
          const { options, mb, isClear, isSubmit } = nodeOptions as ITabType;
          return (
            <Grid key={i} item xs={12} mb={mb || 3}>
              <Controller
                name={id}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <TabContext value={value || options[0].value}>
                    <TabList
                      name={name}
                      onChange={(_: SyntheticEvent, newValue: string) => {
                        if (isClear) {
                          reset({
                            ...defaultValues,
                            [name]: newValue,
                          });
                        } else {
                          onChange(newValue);
                        }
                        if (isSubmit) {
                          onSubmit(
                            convortorParams({
                              payload: { ...getValues(), [name]: newValue },
                              items: nodeItems,
                            })
                          );
                        }
                      }}
                    >
                      {options.map((option) => (
                        <Tab
                          key={option.value}
                          {...option}
                          disabled={isDisabled}
                        />
                      ))}
                    </TabList>
                  </TabContext>
                )}
              />
            </Grid>
          );
        } else if (nodeType === "CATEGORYS") {
          return (
            <Grid key={i} item xs={12}>
              <Controller
                name={id}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CategorysComp
                    values={value}
                    handleCallback={onChange}
                    isDisabled={isDisabled}
                  />
                )}
              />
            </Grid>
          );
        } else if (nodeType === "COMPLEX") {
          const { childNode } = nodeOptions as IComplexType;

          return (
            <Grid key={i} item xs={xs || 12}>
              <Stack direction="row" spacing={5} alignItems="center">
                {label && (
                  <Typography sx={{ wordBreak: "keep-all" }}>
                    {label}
                  </Typography>
                )}
                <Grid container alignItems={"center"} spacing={1}>
                  {renderNodeItem(childNode || [])}
                </Grid>
              </Stack>
            </Grid>
          );
        }

        return null;
      });
    };

    //기본값으로 검색 초기화
    const handleReset = () => {
      const { pathname } = router;
      if (isQueryString) {
        router.replace(pathname);
      }
      reset(defaultValues);
    };

    //searchBox입력값들을 쿼리전송을 위해 가공
    const convortorParams = ({
      payload,
      items,
    }: {
      payload: { [key: string]: any };
      items: INodeItem[];
    }) => {
      const newParams = items.reduce(
        (acc: { [key: string]: any }, cur: INodeItem) => {
          const { nodeType, id, nodeOptions } = cur;
          if (nodeType === "DATE_RANGE_PICKER") {
            if (nodeOptions) {
              const { ids } = nodeOptions as IDatePickerType;
              const [startDate, endDate] = payload[id] || [null, null];
              acc[ids[0]] = startDate;
              acc[ids[1]] = endDate;
            }
          } else if (nodeType === "CHECK_BOX") {
            acc[id] = payload[id] ? payload[id].join(" ,") : null;
          } else if (nodeType === "COMPLEX") {
            const { childNode } = nodeOptions as IComplexType;
            const childParams =
              convortorParams({ payload, items: childNode }) || {};
            for (const key in childParams) {
              if (childParams[key] || childParams[key] === "") {
                acc[key] = childParams[key];
              } else {
                acc[key] = null;
              }
            }
          } else if (nodeType === "CATEGORYS") {
            if (nodeOptions) {
              const { ids } = nodeOptions as IDatePickerType;
              const categorys = payload[id] || [];
              ids.forEach((id, i) => {
                if (categorys[i]) {
                  acc[id] = categorys[i];
                }
              });
            }
          } else if (payload[id] || payload[id] === "") {
            acc[id] = payload[id];
          }

          return acc;
        },
        {}
      );

      return newParams;
    };

    //초기화
    useEffect(() => {
      if (params) {
        const initParams = ({ items }: { items: INodeItem[] }) => {
          return items.reduce((acc: { [key: string]: any }, cur: INodeItem) => {
            const { nodeType, id, nodeOptions } = cur;

            if (nodeType === "DATE_RANGE_PICKER") {
              if (nodeOptions) {
                const { ids } = nodeOptions as IDatePickerType;
                acc[id] = ids.map((childId) => params[childId]);
              }
            } else if (nodeType === "CHECK_BOX") {
              if (nodeOptions && params[id]) {
                acc[id] = params[id].split(" ,");
              }
            } else if (nodeType === "COMPLEX") {
              const { childNode } = nodeOptions as IComplexType;
              const childParams = initParams({ items: childNode }) || {};
              for (const key in childParams) {
                if (childParams[key] || childParams[key] === "") {
                  acc[key] = childParams[key];
                } else {
                  acc[key] = null;
                }
              }
            } else if (nodeType === "CATEGORYS") {
              const { ids } = nodeOptions as IDatePickerType;
              acc[id] = ids.map((childId) => params[childId]);
            } else if (params[id] || params[id] === "") {
              acc[id] = params[id];
            }

            return acc;
          }, {});
        };
        reset(initParams({ items: nodeItems }));
      }
    }, [params]);

    //초기상태
    useEffect(() => {
      if (defaultValues && isEnabled) {
        onSubmit(convortorParams({ payload: defaultValues, items: nodeItems }));
      }
    }, []);

    // ref로 함수 설정
    //다른 컴포넌트에서도 ref를 통해 메소드에 접근할 수 있게
    useImperativeHandle(ref, () => ({
      paramsReset() {
        const { pathname } = router;
        if (isQueryString) {
          router.replace(pathname);
        }
        reset(defaultValues);
      },
      displaySeqParamsReset() {
        const { pathname } = router;
        if (isQueryString) {
          router.replace(pathname);
        }
        reset(defaultValues);
        if (defaultValues)
          onSubmit(
            convortorParams({ payload: defaultValues, items: nodeItems })
          );
      },
    }));

    return (
      <>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit((payload) => {
            onSubmit(convortorParams({ payload, items: nodeItems }));
          })}
        >
          <Grid container spacing={2} rowSpacing={2}>
            {renderNodeItem(nodeItems)}
          </Grid>
          <Stack direction="row" spacing={2} mt={10} justifyContent={"center"}>
            <Button variant="outlined" size="medium" onClick={handleReset}>
              초기화
            </Button>
            <Button type="submit" variant="contained" size="medium">
              조회
            </Button>
          </Stack>
        </form>
      </>
    );
  }
);

export default RefSearchFomComp;
