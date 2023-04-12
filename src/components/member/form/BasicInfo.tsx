import React, { ReactNode, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import useGetMenuButtons from "@/hooks/useGetMenuButtons";
import { IOptions } from "@/types/common";

import usePostCode from "@/hooks/usePostCode";

import customerOptions from "@/assets/constants/customer";
import BUTTON_CONFIG from "@/assets/api/button";
import API_MEMBER from "@/assets/api/member";
import fetcher from "@/utils/fetcher";
import { dialogsActions } from "@/store/reducers/dialogsReducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Grid from "@mui/material/Grid";
import { WarningAmberOutlined } from "@mui/icons-material";
import DialogsComp from "@/components/Dialog/DialogComp";
import EssentialComp from "@/components/common/EssentialComp";

interface IProps {
  control: any;
  errors: any;
  detailData: any;
  setValue: any;
  disabled: boolean | undefined;
  memberGrade: IOptions[];
  children: ReactNode;
}

interface IDuplicateCheck {
  nickNameCheck: boolean;
}

const BasicInfo = ({
  control,
  errors,
  detailData,
  setValue,
  disabled,
  memberGrade,
  children,
}: IProps) => {
  const dispatch = useDispatch();
  //우편검색
  const postCode = usePostCode(); //주소
  //성별
  const [isGender, setIsGender] = useState<string>("");
  //국적
  const [isNationality, setIsNationality] = useState<string>("");
  //닉네임
  const [isNickName, setIsNickName] = useState<string>("");
  //중복확인
  const [duplicateCheck, setDuplicateCheck] = useState<IDuplicateCheck>({
    nickNameCheck: false,
  });

  //button
  //버튼 세팅
  //닉네임 체크
  const duplicateNickNameButton = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "duplicate-nickName-check",
        fieldProps: BUTTON_CONFIG.BUTTON_DELETE,
      },
    ],
  });

  //주소검색창
  const searchAddressButton = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "search-address-button",
        fieldProps: BUTTON_CONFIG.BUTTON_DELETE,
      },
    ],
  });
  //비밀번호 초기화 버튼
  const passwordResetButtons = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "password-reset",
        fieldProps: {
          ...BUTTON_CONFIG.BUTTON_DELETE,
          style: {
            minWidth: "150px",
          },
        },
      },
    ],
  });

  //비밀번호 초기화
  const handlePasswordReset = (buttonId: string) => {};

  //닉네임 validation
  //닉네임 중복 체크
  const nickNameValidHandler = async () => {
    await fetcher({
      api: API_MEMBER.MEMBER_NICKNAME_DUPLICATE,
      options: {
        customerNo: detailData.memberNo,
        nickName: isNickName,
      },
    })
      .then((r) => {
        if (r.status === 200) {
          toast.success("닉네임 중복 체크 확인");
          setDuplicateCheck({
            ...duplicateCheck,
            nickNameCheck: true,
          });
        } else {
          toast.error("닉네임이 중복되었습니다.");
        }
      })
      .catch((error: any) => {
        toast.error("닉네임이 중복되었습니다.");
      });
  };

  //성별 핸들러
  const genderHandler = (value: any) => {
    setIsGender(value);
    return value;
  };

  //국적 핸들러
  const nationalityHandler = (value: any) => {
    setIsNationality(value);
    return value;
  };

  //닉네임 핸들러
  const nickNameHandler = (value: any) => {
    setIsNickName(value);
    return value;
  };

  //useEffect
  //에러 발생시
  useEffect(() => {
    if (errors.sellerInfo) {
      console.log("test");
    }
    //중복체크 경고 dialog
    if (errors.duplicateCheck) {
      if (errors.duplicateCheck.nickNameCheck) {
        dispatch(
          dialogsActions.setDialog({
            id: "NickNameDuplicateCheck",
            comp: (
              <DialogsComp
                id="NickNameDuplicateCheck"
                dialogActions={[
                  {
                    label: "확인",
                    fieldProps: BUTTON_CONFIG.BUTTON_CREATE,
                    onClick: async () => {
                      dispatch(dialogsActions.clear({}));
                    },
                  },
                ]}
              >
                <Grid sx={{ textAlign: "center", mt: "20px" }}>
                  <WarningAmberOutlined sx={{ float: "left" }} />
                  {errors.duplicateCheck.nickNameCheck.message}
                </Grid>
              </DialogsComp>
            ),
          })
        );
      }
    }
  }, [errors]);

  //중복체크 확인된 경우
  useEffect(() => {
    if (duplicateCheck) {
      //form의 중복확인을 true로
      setValue("duplicateCheck", duplicateCheck);
    }
  }, [duplicateCheck]);

  //주소변동 처리
  useEffect(() => {
    if (postCode.address) {
      setValue("address", postCode.address?.roadAddress);
      setValue("zipcode", postCode.address?.zonecode);
    }
  }, [postCode.openProps]);

  //비활성화 해제시
  useEffect(() => {
    if (!disabled) {
      //회원
      passwordResetButtons.setSettingButtons([
        {
          buttonId: "password-reset",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_DELETE,
            style: {
              color: "white",
              width: "150px",
            },
          },
        },
      ]);
      duplicateNickNameButton.setSettingButtons([
        {
          buttonId: "duplicate-nickName-check",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_DELETE,
            ...BUTTON_CONFIG.BUTTON_TEXT_WHITE,
          },
        },
      ]);
      searchAddressButton.setSettingButtons([
        {
          buttonId: "search-address-button",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_DELETE,
            ...BUTTON_CONFIG.BUTTON_TEXT_WHITE,
          },
        },
      ]);
    }
  }, [disabled]);

  return (
    <Card sx={{ mt: "10px" }}>
      <CardHeader title="기본정보" titleTypographyProps={{ variant: "h6" }} />
      <CardContent>
        <TableContainer>
          <Table>
            <colgroup>
              <col style={{ width: "14%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "1%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "1%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "1%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
            <TableBody>
              <TableRow>
                <TableCell colSpan={1}>
                  <EssentialComp>
                    <FormLabel>최종 로그인 일시</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="lastLoginDatetime"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => value}
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <EssentialComp>
                    <FormLabel>회원타입</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={3}>
                  <Controller
                    name="memberType"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        options={customerOptions.customerType}
                        getOptionLabel={(option) => option.label}
                        onChange={(_, newValue) => onChange(newValue?.value)}
                        value={
                          customerOptions.customerType.find(
                            (opt) => opt.value === value
                          ) || customerOptions.customerType[0]
                        }
                        renderInput={(params) => (
                          <input
                            type="text"
                            style={{
                              border: "none",
                              background: "none",
                              color: "rgba(58, 53, 65, 0.68)",
                            }}
                            {...params.inputProps}
                            name="memberType"
                          />
                        )}
                        size="small"
                        disabled={true}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <EssentialComp>
                    <FormLabel>비밀번호</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={3}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type="password"
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.password)}
                        helperText={errors.password && errors.password.message}
                        disabled={true}
                        fullWidth
                      />
                    )}
                  />
                </TableCell>

                <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                  {passwordResetButtons.buttons.map(
                    ({ buttonId, buttonDesc, fieldProps }) => (
                      <Button
                        key={buttonId}
                        {...fieldProps}
                        disabled={disabled}
                        onClick={() => handlePasswordReset(buttonId)}
                      >
                        {buttonDesc}
                      </Button>
                    )
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                  <EssentialComp>
                    <FormLabel>이름</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="memberName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.memberName)}
                        helperText={
                          errors.memberName && errors.memberName.message
                        }
                        disabled={disabled}
                        fullWidth
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <EssentialComp>
                    <FormLabel>회원등급</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={3}>
                  <Controller
                    name="memberGradeNo"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        id="memberGradeNo"
                        options={memberGrade}
                        value={
                          memberGrade.find((opt) => opt.value === value) !==
                          undefined
                            ? memberGrade.find((opt) => opt.value === value)
                            : detailData.memberGradeNo
                        }
                        getOptionLabel={(memberGrade: any) =>
                          memberGrade.label || ""
                        }
                        onChange={(_, newValue: any) => {
                          return onChange(newValue?.value);
                        }}
                        disabled={disabled}
                        renderInput={(params) => (
                          <TextField {...params} name="memberGradeNo" />
                        )}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={3}>
                  <FormLabel>간편가입채널</FormLabel>
                </TableCell>
                <TableCell colSpan={3}>
                  <Controller
                    name="signChannel"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.signChannel)}
                        helperText={
                          errors.signChannel && errors.signChannel.message
                        }
                        disabled={disabled}
                        fullWidth
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={3}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                  <EssentialComp>
                    <FormLabel>닉네임</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="nickName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={nickNameHandler(value) || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.nickName)}
                        helperText={errors.nickName && errors.nickName.message}
                        disabled={disabled}
                        fullWidth
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  {duplicateNickNameButton.buttons.map(
                    ({ buttonId, buttonDesc, fieldProps = {} }, i) => (
                      <Button
                        disabled={disabled}
                        {...fieldProps}
                        key={i}
                        onClick={nickNameValidHandler}
                      >
                        {buttonDesc}
                      </Button>
                    )
                  )}
                </TableCell>
                <TableCell colSpan={2}>
                  <EssentialComp>
                    <FormLabel>아이디</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={4}>
                  <Controller
                    name="memberId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => value}
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <EssentialComp>
                    <FormLabel>계정상태</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={4}>
                  <Controller
                    name="memberStatusCodeName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => value}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                  <EssentialComp>
                    <FormLabel>생년월일</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="dateOfBirth1"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.dateOfBirth1)}
                        inputProps={{ maxLength: "4" }}
                        helperText={
                          errors.dateOfBirth1 && errors.dateOfBirth1.message
                        }
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={1}>년</TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="dateOfBirth2"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.dateOfBirth2)}
                        inputProps={{ maxLength: "2" }}
                        helperText={
                          errors.dateOfBirth2 && errors.dateOfBirth2.message
                        }
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={1}>월</TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="dateOfBirth3"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.dateOfBirth3)}
                        inputProps={{ maxLength: "2" }}
                        helperText={
                          errors.dateOfBirth3 && errors.dateOfBirth3.message
                        }
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={1}>일</TableCell>
                <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                  <EssentialComp>
                    <FormLabel>성별</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={8}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <RadioGroup
                        row
                        value={value ? genderHandler(value) : ""}
                        onChange={(e) => {
                          setIsGender(e.target.value);
                          return onChange(e.target.value);
                        }}
                      >
                        {customerOptions?.gender.map((option: IOptions) => (
                          <FormControlLabel
                            disabled={disabled}
                            key={option.value}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                  <EssentialComp>
                    <FormLabel>휴대폰</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="mobilePhoneNo1"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.mobilePhoneNo1)}
                        inputProps={{ maxLength: "3" }}
                        helperText={
                          errors.mobilePhoneNo1 && errors.mobilePhoneNo1.message
                        }
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={1}>-</TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="mobilePhoneNo2"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.mobilePhoneNo2)}
                        inputProps={{ maxLength: "4" }}
                        helperText={
                          errors.mobilePhoneNo2 && errors.mobilePhoneNo2.message
                        }
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={1}>-</TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="mobilePhoneNo3"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.mobilePhoneNo3)}
                        inputProps={{ maxLength: "4" }}
                        helperText={
                          errors.mobilePhoneNo3 && errors.mobilePhoneNo3.message
                        }
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={3}>
                  <EssentialComp>
                    <FormLabel>본인인증 여부</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="authenticationYn"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        value={value}
                        checked={value === "Y"}
                        onChange={({ target: { checked } }) =>
                          onChange(checked ? "Y" : "N")
                        }
                        disabled={true}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <EssentialComp>
                    <FormLabel>국적</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={8}>
                  <Controller
                    name="nationality"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <RadioGroup
                        row
                        value={value ? nationalityHandler(value) : ""}
                        onChange={(e) => {
                          setIsNationality(e.target.value);
                          return onChange(e.target.value);
                        }}
                      >
                        {customerOptions?.nationality.map(
                          (option: IOptions) => (
                            <FormControlLabel
                              disabled={disabled}
                              key={option.value}
                              value={option.value}
                              control={<Radio />}
                              label={option.label}
                            />
                          )
                        )}
                      </RadioGroup>
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                  <EssentialComp>
                    <FormLabel>이메일</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={5}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.email)}
                        helperText={errors.email && errors.email.message}
                        disabled={disabled}
                        type="email"
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={3}>
                  <FormLabel>마케팅 활용동의</FormLabel>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="marketingUseAgreementYn"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        value={value}
                        checked={value === "Y"}
                        onChange={({ target: { checked } }) =>
                          onChange(checked ? "Y" : "N")
                        }
                        disabled={true}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={7}>
                  <Checkbox
                    name={"alimtalkReceiveYn"}
                    checked={detailData.alimtalkReceiveYn === "Y"}
                    disabled={true}
                    onChange={(e, val) => {}}
                  />
                  알림톡
                  <Checkbox
                    name={"emailReceiveYn"}
                    checked={detailData.emailReceiveYn === "Y"}
                    disabled={true}
                    onChange={(e, val) => {}}
                  />
                  email
                  <Checkbox
                    name={"smsReceiveYn"}
                    checked={detailData.smsReceiveYn === "Y"}
                    disabled={true}
                    onChange={(e, val) => {}}
                  />
                  SMS
                  <Checkbox
                    name={"apppushReceiveYn"}
                    checked={detailData.apppushReceiveYn === "Y"}
                    disabled={true}
                    onChange={(e, val) => {}}
                  />
                  AppPush
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                  <FormLabel>약관동의여부</FormLabel>
                </TableCell>
                <TableCell colSpan={4}>
                  <Checkbox
                    name={"termsAgreementYn"}
                    checked={detailData.termsAgreementYn === "Y"}
                    disabled={true}
                    onChange={(e, val) => {}}
                  />
                  모든약관에 동의합니다.
                </TableCell>
                <TableCell colSpan={12}>
                  <TableRow>
                    <TableCell sx={{ width: "10%" }}>
                      <Checkbox
                        name={"personalInfoUseAgreementYn"}
                        checked={detailData.personalInfoUseAgreementYn === "Y"}
                        disabled={true}
                        onChange={(e, val) => {}}
                      />
                      개인정보사용동의여부에 동의합니다.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}>
                      <Checkbox
                        name={"authenticationYn"}
                        checked={detailData.authenticationYn === "Y"}
                        disabled={true}
                        onChange={(e, val) => {}}
                      />
                      본인인증여부에 동의합니다.
                    </TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                  <FormLabel>주소</FormLabel>
                </TableCell>
                <TableCell colSpan={4}>
                  <Controller
                    name="zipcode"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.zipcode)}
                        helperText={errors.zipcode && errors.zipcode.message}
                        fullWidth
                        placeholder={"우편번호"}
                        disabled={true}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={9}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.address)}
                        placeholder={"주소"}
                        helperText={errors.address && errors.address.message}
                        fullWidth
                        disabled={true}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={3} sx={{ textAlign: "right" }}>
                  {searchAddressButton.buttons.map(
                    ({ buttonId, buttonDesc, fieldProps = {} }, i) => (
                      <Button
                        disabled={disabled}
                        key={i}
                        {...fieldProps}
                        {...postCode.openProps}
                      >
                        {buttonDesc}
                      </Button>
                    )
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}></TableCell>
                <TableCell colSpan={16}>
                  <Controller
                    name="addressDetail"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.addressDetail)}
                        helperText={
                          errors.addressDetail && errors.addressDetail.message
                        }
                        placeholder={"상세주소"}
                        fullWidth
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {detailData.memberType === "NORMAL" && (
          <Stack
            direction="row"
            spacing={2}
            pt={5}
            pr={5}
            pb={5}
            justifyContent={"right"}
          >
            {children}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
export default BasicInfo;
