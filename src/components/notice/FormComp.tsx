import React, {ReactNode, useEffect, useState} from "react";
import * as yup from "yup";
import MSG from "@/assets/constants/messages";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {
  Autocomplete,
  Card,
  CardContent, FormControl,
  FormLabel, Stack, Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, TextField
} from "@mui/material";
import EssentialComp from "@/components/atoms/EssentialComp";
import customerSatisfactionOptions from "@/assets/constants/codes/customerSatisfaction";
import moment from "moment/moment";
import DatePickerWrapper from "@/@core/styles/libs/react-datepicker";
import DatePicker, {registerLocale} from "react-datepicker";
import styled from "@emotion/styled";
import useEditor from "@/hooks/useEditor";
import EditorComp from "@/components/atoms/EditorComp";
import {ko} from "date-fns/locale";

interface IProps {
  children?: ReactNode
  disabled?: boolean
  detailData?: any | null
  onSubmit?: (payload: any) => void
  displayTermFixYn?: any
}

const schema = yup.object().shape({
  noticeType: yup.string().required(MSG.ERROR.REQUIRED),
  noticeTarget: yup.string().required(MSG.ERROR.REQUIRED),
  noticeTitle: yup.string().required(MSG.ERROR.REQUIRED),
  noticeContent: yup.string().required(MSG.ERROR.REQUIRED),
  useYn: yup.string().required(MSG.ERROR.REQUIRED),
  topFixYn: yup.string().required(MSG.ERROR.REQUIRED),
  displayTermFixYn: yup.string().required(MSG.ERROR.REQUIRED),
});

const MyBlock = styled.div`
  .wrapper-class{ width: 100%; margin: 0 auto; margin-bottom: 4rem; }
  .editor { height: 350px !important; border: 1px solid #f1f1f1 !important; padding: 5px !important; border-radius: 2px !important; }
`;

const FormComp = ({children, disabled, detailData, onSubmit, displayTermFixYn}: IProps) => {

  const {control, handleSubmit, reset, formState: {errors}} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });
  const editor = useEditor()

  registerLocale("ko", ko);

  useEffect(() => {
    if (displayTermFixYn === 'Y') {
      setDisplayTerm(true)
    }
  }, [])

  useEffect(() => {
    if (detailData) {
      const {
        noticeNo,
        noticeType,
        noticeTarget,
        displaySeq,
        noticeTitle,
        noticeContent,
        useYn,
        topFixYn,
        displayTermFixYn,
        displayStartDatetime,
        displayEndDatetime
      } = detailData
      reset({
        noticeNo,
        noticeType,
        noticeTarget,
        displaySeq,
        noticeTitle,
        noticeContent,
        useYn,
        topFixYn,
        displayTermFixYn,
        displayStartDatetime,
        displayEndDatetime
      })
      editor.setEditorState(editor.getHtmlToDraft(noticeContent))
    }
  }, [detailData]);

  const [displayTerm, setDisplayTerm] = useState(false);
  const displayTermBtn = () => {
    if(!disabled)
      setDisplayTerm((prevState) => !prevState);
  };

  return (
    <form autoComplete='off' onSubmit={onSubmit && handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <TableContainer>
            <Table size='small'>
              <colgroup>
                <col style={{width: '15%'}}/>
                <col style={{width: '35%'}}/>
                <col style={{width: '15%'}}/>
                <col style={{width: '35%'}}/>
                <col/>
              </colgroup>
              <TableBody>
                <TableRow>
                  <TableCell component={'th'}>
                    <FormLabel>
                      <EssentialComp>유형</EssentialComp>
                    </FormLabel>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <Controller name='noticeType' control={control} render={({field: {value, onChange}}) => (
                      <Autocomplete
                        options={customerSatisfactionOptions.noticeType}
                        getOptionLabel={option => option.label}
                        onChange={(_, newValue) => onChange(newValue?.value)}
                        value={(customerSatisfactionOptions.noticeType).find(opt => opt.value === value) || customerSatisfactionOptions.noticeType[0]}
                        renderInput={params => <TextField {...params} name='noticeType'/>} size='small'
                        disabled={disabled}
                      />
                    )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={'th'}>
                    <FormLabel>
                      <EssentialComp>대상</EssentialComp>
                    </FormLabel>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <Controller name='noticeTarget' control={control} render={({field: {value, onChange}}) => (
                      <Autocomplete
                        options={customerSatisfactionOptions.noticeTarget}
                        getOptionLabel={option => option.label}
                        onChange={(_, newValue) => onChange(newValue?.value)}
                        value={(customerSatisfactionOptions.noticeTarget).find(opt => opt.value === value) || customerSatisfactionOptions.noticeTarget[0]}
                        renderInput={params => <TextField {...params} name='noticeType'/>} size='small'
                        disabled={disabled}
                      />
                    )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={'th'}>
                    <FormLabel>
                      <EssentialComp>제목</EssentialComp>
                    </FormLabel>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <Controller name='noticeTitle' control={control} render={({field: {value, onChange}}) => (
                      <TextField
                        value={value || ''} onChange={onChange} size='small'
                        error={Boolean(errors.noticeTitle)}
                        helperText={errors.noticeTitle && errors.noticeTitle.message} fullWidth
                        disabled={disabled}
                      />
                    )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={'th'}>
                    <FormLabel>
                      <EssentialComp>내용</EssentialComp>
                    </FormLabel>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <Controller
                      name='noticeContent'
                      control={control}
                      render={({ field: { onChange } }) => (
                        <EditorComp
                          readOnly={disabled}
                          {...editor.props}
                          handleOnChange={value => onChange(editor.getDraftToHtml(value))}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={'th'}>
                    <FormLabel>
                      <EssentialComp>사용여부</EssentialComp>
                    </FormLabel>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControl>
                      <Controller name='useYn' control={control} render={({field: {value, onChange}}) => (
                        <Switch
                          value={value}
                          checked={value === 'Y'}
                          onChange={({target: {checked}}) => onChange(checked ? 'Y' : 'N')}
                          disabled={disabled}
                        />
                      )}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={'th'}>
                    <FormLabel>
                      <EssentialComp>상단노출여부</EssentialComp>
                    </FormLabel>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControl>
                      <Controller name='topFixYn' control={control} render={({field: {value, onChange}}) => (
                        <Switch
                          value={value}
                          checked={value === 'Y'}
                          onChange={({target: {checked}}) => onChange(checked ? 'Y' : 'N')}
                          disabled={disabled}
                        />
                      )}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell component={'th'}>
                    <FormLabel>
                      <EssentialComp>노출기간 설정여부</EssentialComp>
                    </FormLabel>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControl onClick={displayTermBtn}>
                      <Controller name='displayTermFixYn' control={control} render={({field: {value, onChange}}) => (
                        <Switch
                          value={value}
                          checked={value === 'Y'}
                          onChange={({target: {checked}}) => onChange(checked ? 'Y' : 'N')}
                          disabled={disabled}
                        />
                      )}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
                {
                  displayTerm &&
                  <TableRow>
                    <TableCell component={'th'}>
                      <FormLabel>게시 시작 일시</FormLabel>
                    </TableCell>
                    <TableCell colSpan={1}>
                      <FormControl>
                        <Controller
                          name='displayStartDatetime'
                          control={control}
                          render={({field: {name, value, onChange}}) => (
                            <DatePickerWrapper sx={{width: '400px'}}>
                              <DatePicker
                                minDate={new Date()}
                                disabled={disabled}
                                showTimeSelect
                                locale='ko'
                                dateFormat='yyyy-MM-dd HH:mm'
                                dateFormatCalendar='yyyy년MM월'
                                selected={value ? new Date(moment(value).format('YYYY-MM-DD HH:mm')) : null}
                                onChange={(date: Date) => {
                                  if (date) {
                                    onChange(moment(date).format('YYYY-MM-DD HH:mm'))
                                  }
                                }}
                                customInput={<TextField name={name} fullWidth size='small'/>}
                              />
                            </DatePickerWrapper>
                          )}
                        />
                      </FormControl>
                    </TableCell>
                    <TableCell component={'th'}>
                      <FormLabel>게시 종료 일시</FormLabel>
                    </TableCell>
                    <TableCell colSpan={1}>
                      <FormControl>
                        <Controller
                          name='displayEndDatetime'
                          control={control}
                          render={({field: {name, value, onChange}}) => (
                            <DatePickerWrapper sx={{width: '400px'}}>
                              <DatePicker
                                minDate={new Date()}
                                disabled={disabled}
                                showTimeSelect
                                locale='ko'
                                dateFormat='yyyy-MM-dd HH:mm'
                                dateFormatCalendar='yyyy년MM월'
                                selected={value ? new Date(moment(value).format("YYYY-MM-DD HH:mm")) : null}
                                onChange={(date: Date) => {
                                  if (date) {
                                    onChange(moment(date).format('YYYY-MM-DD HH:mm'))
                                  }
                                }}
                                customInput={<TextField name={name} fullWidth size='small'/>}
                              />
                            </DatePickerWrapper>
                          )}
                        />
                      </FormControl>
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <Stack direction='row' spacing={2} pr={5} pb={5} justifyContent={'right'}>
          {children}
        </Stack>
      </Card>
    </form>
  )
};

export default FormComp;
