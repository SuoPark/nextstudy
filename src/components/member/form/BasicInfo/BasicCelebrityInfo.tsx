import React, { ReactNode, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormLabel,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import useGetMenuButtons from "@/hooks/useGetMenuButtons";
import seller from "@/assets/constants/seller";
import BUTTON_CONFIG from "@/assets/api/button";
import { useDispatch } from "react-redux";
import EssentialComp from "@/components/common/EssentialComp";
import FileUploadComp from "@/components/common/FileUploadComp";
import DialogsComp from "@/components/Dialog/DialogComp";
import CountryModalComp from "@/components/client/seller/countryModal/CountryModalComp";
import { Address } from "react-daum-postcode";
import { dialogsActions } from "@/store/reducers/dialogsReducer";

interface IProps {
  control: any;
  errors: any;
  detailData: any;
  setValue: any;
  disabled: boolean | undefined;
  setCelebrityCountryInfo: React.Dispatch<any>;
  celebrityPostCode: {
    openProps: {
      onClick: () => void;
    };
    embedProps: {
      onComplete: (data: any) => void;
    };
    address: Address | null;
  };
  children: ReactNode;
}
const BasicCelebrityInfo = ({
  control,
  errors,
  detailData,
  setValue,
  disabled,
  setCelebrityCountryInfo,
  celebrityPostCode,
  children,
}: IProps) => {
  const [
    celebrityBasicCommissionApplyType,
    setCelebrityBasicCommissionApplyType,
  ] = useState<string>(detailData.celebrityInfo?.basicCommissionApplyType);
  const dispatch = useDispatch();
  //셀럽주소버튼
  const celebritySearchAddressButton = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "celebrity-search-address-button",
        fieldProps: {
          ...BUTTON_CONFIG.BUTTON_DELETE,
          ...BUTTON_CONFIG.BUTTON_FLOAT_RIGHT,
        },
      },
    ],
  });
  const celebrityNationButtons = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "celebrity-nation-button",
        fieldProps: BUTTON_CONFIG.BUTTON_DELETE,
      },
    ],
  });
  const celebrityAccountVerificationButtons = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "celebrity-account-verificationButton",
        fieldProps: BUTTON_CONFIG.BUTTON_DELETE,
      },
    ],
  });

  const [celebrityImage] = useState<any>({
    businessRegistrationImagePath:
      detailData.celebrityInfo?.businessRegistrationImagePath,
    mailOrderRegisterImagePath:
      detailData.celebrityInfo?.mailOrderRegisterImagePath,
    contractFilePath: detailData.celebrityInfo?.contractFilePath,
    accountImagePath: detailData.celebrityInfo?.accountImagePath,
  });
  //celebrity 국가 Modal
  const celebrityCountryModalHandler = () => {
    dispatch(
      dialogsActions.setDialog({
        id: "countryNo",
        comp: (
          <DialogsComp
            id="countryNo"
            title="국가 검색"
            initialProps={{ scroll: "paper" }}
          >
            <CountryModalComp callbackData={setCelebrityCountryInfo} />
          </DialogsComp>
        ),
      })
    );
  };
  const celebrityAccountVerifyHandler = () => {
    setValue("celebrityInfo.accountVerifyYn", "Y");
  };
  //비활성화 해제시
  useEffect(() => {
    if (!disabled) {
      //셀럽
      celebritySearchAddressButton.setSettingButtons([
        {
          buttonId: "celebrity-search-address-button",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_DELETE,
            style: {
              color: "white",
              float: "right",
            },
          },
        },
      ]);
      celebrityNationButtons.setSettingButtons([
        {
          buttonId: "celebrity-nation-button",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_DELETE,
            ...BUTTON_CONFIG.BUTTON_TEXT_WHITE,
          },
        },
      ]);
      celebrityAccountVerificationButtons.setSettingButtons([
        {
          buttonId: "celebrity-account-verificationButton",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_DELETE,
            ...BUTTON_CONFIG.BUTTON_TEXT_WHITE,
          },
        },
      ]);
    }
  }, [disabled]);
  return (
    <>
      <Card sx={{ mt: "10px" }}>
        <CardHeader
          title="기본 정보"
          titleTypographyProps={{ variant: "h6" }}
        />
        <CardContent>
          <TableContainer>
            <Table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "15%" }} />
                <col />
              </colgroup>
              <TableBody>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>
                      <EssentialComp>셀럽카테고리</EssentialComp>
                    </FormLabel>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.celebrityCategoryName"
                      control={control}
                      render={({ field: { value, onChange } }) => value}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>
                      <EssentialComp>셀럽코드</EssentialComp>
                    </FormLabel>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.celebrityNo"
                      control={control}
                      render={({ field: { value, onChange } }) => value}
                    />
                  </TableCell>
                  <TableCell component={"th"}>
                    <EssentialComp>
                      <FormLabel>셀럽명</FormLabel>
                    </EssentialComp>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.celebrityName"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <EssentialComp>
                      <FormLabel>국가</FormLabel>
                    </EssentialComp>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityInfo.countryName"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={true}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell colSpan={1}>
                    {celebrityNationButtons.buttons.map(
                      ({ buttonId, buttonDesc, fieldProps = {} }, i) => (
                        <Button
                          disabled={disabled}
                          key={i}
                          {...fieldProps}
                          onClick={celebrityCountryModalHandler}
                        >
                          {buttonDesc}
                        </Button>
                      )
                    )}
                  </TableCell>
                  <TableCell component={"th"}>
                    <EssentialComp>
                      <FormLabel>회사명</FormLabel>
                    </EssentialComp>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.companyName"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <EssentialComp>
                      <FormLabel>법인구분</FormLabel>
                    </EssentialComp>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.corporationType"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Autocomplete
                          disableClearable
                          options={seller.corporationType}
                          getOptionLabel={(option) => option.label}
                          onChange={(_, newValue) => onChange(newValue?.value)}
                          value={
                            seller.corporationType.find(
                              (opt) => opt.value === value
                            ) || seller.corporationType[0]
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="celebrityInfo.corporationType"
                            />
                          )}
                          size="small"
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell component={"th"}>
                    <FormLabel>과세형태</FormLabel>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.taxType"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Autocomplete
                          disableClearable
                          options={seller.taxTypeCode}
                          getOptionLabel={(option) => option.label}
                          onChange={(_, newValue) => onChange(newValue?.value)}
                          value={
                            seller.taxTypeCode.find(
                              (opt) => opt.value === value
                            ) || seller.taxTypeCode[0]
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="celebrityInfo.taxType"
                            />
                          )}
                          size="small"
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>사업자등록번호</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityInfo.businessRegistrationNo"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell colSpan={1} sx={{ width: "140px" }}>
                    <Controller
                      name="celebrityInfo.businessRegistrationImagePath"
                      control={control}
                      render={({ field: { onChange } }) => {
                        return (
                          <FileUploadComp
                            buttonStyle={{
                              width: "140px",
                              marginTop: "25px",
                            }}
                            uploadIcon
                            attachedFiles={
                              celebrityImage.businessRegistrationImagePath
                            }
                            thumbNail={true}
                            handleChange={onChange}
                            disabled={disabled}
                          >
                            이미지 업로드
                          </FileUploadComp>
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell component={"th"}>
                    <FormLabel>통신판매신고번호</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityInfo.mailOrderRegisterNo"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityInfo.mailOrderRegisterImagePath"
                      control={control}
                      render={({ field: { onChange } }) => {
                        return (
                          <FileUploadComp
                            buttonStyle={{
                              width: "140px",
                              marginTop: "25px",
                            }}
                            uploadIcon
                            attachedFiles={
                              celebrityImage.mailOrderRegisterImagePath
                            }
                            thumbNail={true}
                            handleChange={onChange}
                            disabled={disabled}
                          >
                            이미지 업로드
                          </FileUploadComp>
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>대표자명</FormLabel>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.representativeName"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell component={"th"}>
                    <FormLabel>업종</FormLabel>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.businessKind"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>대표 전화번호</FormLabel>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.telephoneNo"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell component={"th"}>
                    <FormLabel>업태</FormLabel>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.businessCondition"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>대표이메일</FormLabel>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.email"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell component={"th"}>
                    <FormLabel>대표 팩스번호</FormLabel>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.faxNo"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>셀럽 주소</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityInfo.zipcode"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          placeholder={"우편번호"}
                          fullWidth
                          disabled={true}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell colSpan={3}>
                    <Controller
                      name="celebrityInfo.address"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          placeholder={"주소"}
                          fullWidth
                          disabled={true}
                        />
                      )}
                    />
                  </TableCell>

                  <TableCell colSpan={1}>
                    {celebritySearchAddressButton.buttons.map(
                      ({ buttonId, buttonDesc, fieldProps }) => (
                        <Button
                          disabled={disabled}
                          key={buttonId}
                          {...fieldProps}
                          {...celebrityPostCode.openProps}
                        >
                          {buttonDesc}
                        </Button>
                      )
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>셀럽 상세 주소</FormLabel>
                  </TableCell>
                  <TableCell colSpan={5}>
                    <Controller
                      name="celebrityInfo.addressDetail"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
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
        </CardContent>
      </Card>
      <Card sx={{ mt: "10px" }}>
        <CardHeader
          title="계약 정보"
          titleTypographyProps={{ variant: "h6" }}
        />
        <CardContent>
          <TableContainer>
            <Table>
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col />
              </colgroup>
              <TableBody>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>기본수수료</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityInfo.basicCommissionApplyType"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Autocomplete
                          options={seller.CommissionTypeCode}
                          getOptionLabel={(option) => option.label}
                          onChange={(_, newValue: any) => {
                            setCelebrityBasicCommissionApplyType(
                              newValue?.value
                            );
                            return onChange(newValue?.value);
                          }}
                          value={
                            seller.CommissionTypeCode.find(
                              (opt) => opt.value === value
                            ) || seller.CommissionTypeCode[0]
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="celebrityInfo.basicCommissionApplyType"
                            />
                          )}
                          size="small"
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  {celebrityBasicCommissionApplyType === "RATE" && (
                    <TableCell colSpan={1}>
                      <Controller
                        name="celebrityInfo.basicCommissionValue"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value + "%" || ""}
                            onChange={onChange}
                            size="small"
                            error={Boolean(errors.celebrityInfo)}
                            helperText={
                              errors.celebrityInfo &&
                              errors.celebrityInfo.message
                            }
                            fullWidth
                            disabled={disabled}
                          />
                        )}
                      />
                    </TableCell>
                  )}
                  {celebrityBasicCommissionApplyType === "AMOUNT" && (
                    <TableCell colSpan={1}>
                      <Controller
                        name="celebrityInfo.basicCommissionValue"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value + "원" || ""}
                            onChange={onChange}
                            size="small"
                            error={Boolean(errors.basicCommissionValue)}
                            helperText={
                              errors.basicCommissionValue &&
                              errors.basicCommissionValue.message
                            }
                            fullWidth
                            disabled={disabled}
                          />
                        )}
                      />
                    </TableCell>
                  )}
                  <TableCell colSpan={1}>
                    <FormLabel>계약서</FormLabel>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <Controller
                      name="celebrityInfo.contractFilePath"
                      control={control}
                      render={({ field: { onChange } }) => {
                        return (
                          <FileUploadComp
                            buttonStyle={{
                              width: "140px",
                              marginTop: "25px",
                            }}
                            uploadIcon
                            attachedFiles={celebrityImage.contractFilePath}
                            thumbNail={true}
                            handleChange={onChange}
                            disabled={disabled}
                          >
                            이미지 업로드
                          </FileUploadComp>
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>정산계좌정보</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityInfo.accountBankCode"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Controller
                      name="celebrityInfo.accountNo"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityInfo.accountName"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityInfo)}
                          helperText={
                            errors.celebrityInfo && errors.celebrityInfo.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell colSpan={1} sx={{ textAlign: "center" }}>
                    <Controller
                      name="celebrityInfo.accountImagePath"
                      control={control}
                      render={({ field: { onChange } }) => {
                        return (
                          <FileUploadComp
                            buttonStyle={{
                              width: "140px",
                              marginTop: "25px",
                            }}
                            uploadIcon
                            attachedFiles={celebrityImage.accountImagePath}
                            thumbNail={true}
                            handleChange={onChange}
                            disabled={disabled}
                          >
                            이미지 업로드
                          </FileUploadComp>
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell colSpan={1}>
                    {celebrityAccountVerificationButtons.buttons.map(
                      ({ buttonId, buttonDesc, fieldProps }) => (
                        <Button
                          key={buttonId}
                          {...fieldProps}
                          disabled={disabled}
                          onClick={celebrityAccountVerifyHandler}
                        >
                          {buttonDesc}
                        </Button>
                      )
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card sx={{ mt: "10px" }}>
        <CardHeader
          title="기타 증빙서류 정보"
          titleTypographyProps={{ variant: "h6" }}
          sx={{ mt: "5px" }}
        />
        {/* <CelebrityEtcDocumentList
          etc={celebrityEtcDocumentList}
          callbackEtc={setCelebrityEtcDocumentList}
          disabled={disabled}
        /> */}
      </Card>
      <Card sx={{ mt: "10px" }}>
        <CardHeader
          title="대표자 정보"
          titleTypographyProps={{ variant: "h6" }}
          sx={{ mt: "5px" }}
        />
        <CardContent>
          <TableContainer>
            <Table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "35%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "35%" }} />
                <col />
              </colgroup>
              <TableBody>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>이름</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityMainManager.managerName"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityMainManager)}
                          helperText={
                            errors.celebrityMainManager &&
                            errors.celebrityMainManager.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell component={"th"}>
                    <FormLabel>직위/직책</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityMainManager.managerPositionName"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityMainManager)}
                          helperText={
                            errors.celebrityMainManager &&
                            errors.celebrityMainManager.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>부서명</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityMainManager.managerDepartmentName"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityMainManager)}
                          helperText={
                            errors.celebrityMainManager &&
                            errors.celebrityMainManager.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell component={"th"}>
                    <FormLabel>팩스번호</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityMainManager.managerFaxNo"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityMainManager)}
                          helperText={
                            errors.celebrityMainManager &&
                            errors.celebrityMainManager.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>이메일</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityMainManager.managerEmail"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityMainManager)}
                          helperText={
                            errors.celebrityMainManager &&
                            errors.celebrityMainManager.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell component={"th"}>
                    <FormLabel>전화번호</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityMainManager.managerTelephoneNo"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityMainManager)}
                          helperText={
                            errors.celebrityMainManager &&
                            errors.celebrityMainManager.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component={"th"}>
                    <FormLabel>휴대폰번호</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityMainManager.managerMobilePhoneNo"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityMainManager)}
                          helperText={
                            errors.celebrityMainManager &&
                            errors.celebrityMainManager.message
                          }
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell component={"th"}>
                    <FormLabel>담당자역할</FormLabel>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Controller
                      name="celebrityMainManager.managerRole"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          onChange={onChange}
                          size="small"
                          error={Boolean(errors.celebrityMainManager)}
                          helperText={
                            errors.celebrityMainManager &&
                            errors.celebrityMainManager.message
                          }
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
        </CardContent>
      </Card>
      <Card sx={{ mt: "10px" }}>
        <CardHeader
          title="담당자 정보"
          titleTypographyProps={{ variant: "h6" }}
          sx={{ mt: "5px" }}
        />
        {/* <CelebrityManagerList
          managerInfo={celebrityManagerList}
          callbackManager={setCelebrityManagerList}
          disabled={disabled}
        /> */}
        <Stack
          direction="row"
          spacing={2}
          pr={5}
          pb={5}
          justifyContent={"right"}
        >
          {children}
        </Stack>
      </Card>
    </>
  );
};
export default BasicCelebrityInfo;
