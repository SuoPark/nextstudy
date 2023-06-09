import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormLabel,
  Switch,
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

import { dialogsActions } from "@/store/reducers/dialogsReducer";

import { useDispatch } from "react-redux";

import EssentialComp from "@/components/common/EssentialComp";
import FileUploadComp from "@/components/common/FileUploadComp";
import DialogsComp from "@/components/Dialog/DialogComp";
import CountryModalComp from "@/components/client/seller/countryModal/CountryModalComp";

import { Address } from "react-daum-postcode";
interface IProps {
  control: any;
  errors: any;
  detailData: any;
  setValue: any;
  disabled: boolean | undefined;
  image: any;
  setCountryInfo: React.Dispatch<any>;
  sellerPostCode: {
    openProps: {
      onClick: () => void;
    };
    embedProps: {
      onComplete: (data: any) => void;
    };
    address: Address | null;
  };
}
const BasicSellerInfo = ({
  control,
  errors,
  detailData,
  setValue,
  disabled,
  image,
  setCountryInfo,
  sellerPostCode,
}: IProps) => {
  const dispatch = useDispatch();

  //판매자 주소 버튼
  const sellerSearchAddressButton = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "seller-search-address-button",
        fieldProps: {
          ...BUTTON_CONFIG.BUTTON_DELETE,
          ...BUTTON_CONFIG.BUTTON_FLOAT_RIGHT,
        },
      },
    ],
  });
  //판매자 국가 버튼
  const sellerNationButtons = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "seller-nation-button",
        fieldProps: BUTTON_CONFIG.BUTTON_DELETE,
      },
    ],
  });

  //Seller 국가 Modal
  const countryModalHandler = () => {
    //dialog state 셋팅
    dispatch(
      dialogsActions.setDialog({
        id: "countryNo",
        comp: (
          <DialogsComp
            id="countryNo"
            title="국가 검색"
            initialProps={{ scroll: "paper" }}
          >
            <CountryModalComp callbackData={setCountryInfo} />
          </DialogsComp>
        ),
      })
    );
  };

  //비활성화 해제시
  useEffect(() => {
    if (!disabled) {
      //판매자
      sellerNationButtons.setSettingButtons([
        {
          buttonId: "seller-nation-button",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_DELETE,
            ...BUTTON_CONFIG.BUTTON_TEXT_WHITE,
          },
        },
      ]);
      sellerSearchAddressButton.setSettingButtons([
        {
          buttonId: "seller-search-address-button",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_DELETE,
            style: {
              color: "white",
              float: "right",
            },
          },
        },
      ]);
    }
  }, [disabled]);
  return (
    <Card sx={{ mt: "10px" }}>
      <CardHeader title="기본 정보" titleTypographyProps={{ variant: "h6" }} />
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
                    <EssentialComp>판매사코드</EssentialComp>
                  </FormLabel>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.sellerNo"
                    control={control}
                    render={({ field: { value, onChange } }) => value}
                  />
                </TableCell>
                <TableCell component={"th"}>
                  <EssentialComp>
                    <FormLabel>판매사명</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.sellerName"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
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
                    name="sellerInfo.countryName"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
                        }
                        fullWidth
                        disabled={true}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  {sellerNationButtons.buttons.map(
                    ({ buttonId, buttonDesc, fieldProps = {} }, i) => (
                      <Button
                        disabled={disabled}
                        key={i}
                        {...fieldProps}
                        onClick={countryModalHandler}
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
                    name="sellerInfo.companyName"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
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
                    name="sellerInfo.corporationType"
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
                            name="sellerInfo.corporationType"
                          />
                        )}
                        size="small"
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell component={"th"}>
                  <EssentialComp>
                    <FormLabel>과세형태</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.taxType"
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
                          <TextField {...params} name="sellerInfo.taxType" />
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
                  <EssentialComp>
                    <FormLabel>사업자등록번호</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="sellerInfo.businessRegistrationNo"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
                        }
                        fullWidth
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={1} sx={{ width: "140px" }}>
                  <Controller
                    name="sellerInfo.businessRegistrationImagePath"
                    control={control}
                    render={({ field: { onChange } }) => {
                      return (
                        <FileUploadComp
                          buttonStyle={{
                            width: "140px",
                            marginTop: "25px",
                          }}
                          uploadIcon
                          attachedFiles={image.businessRegistrationImagePath}
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
                  <EssentialComp>
                    <FormLabel>통신판매신고번호</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="sellerInfo.mailOrderRegisterNo"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
                        }
                        fullWidth
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={1} sx={{ width: "10px" }}>
                  <Controller
                    name="sellerInfo.mailOrderRegisterImagePath"
                    control={control}
                    render={({ field: { onChange } }) => {
                      return (
                        <FileUploadComp
                          buttonStyle={{
                            width: "140px",
                            marginTop: "25px",
                          }}
                          uploadIcon
                          attachedFiles={image.mailOrderRegisterImagePath}
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
                  <EssentialComp>
                    <FormLabel>대표자명</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.representativeName"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
                        }
                        fullWidth
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell component={"th"}>
                  <EssentialComp>
                    <FormLabel>업종</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.businessKind"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
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
                    <FormLabel>대표 전화번호</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.telephoneNo"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
                        }
                        fullWidth
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                <TableCell component={"th"}>
                  <EssentialComp>
                    <FormLabel>업태</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.businessCondition"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
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
                    <FormLabel>대표이메일</FormLabel>
                  </EssentialComp>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.email"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
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
                    name="sellerInfo.faxNo"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
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
                  <FormLabel>판매자 주소</FormLabel>
                </TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="sellerInfo.zipcode"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
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
                    name="sellerInfo.address"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
                        }
                        placeholder={"주소"}
                        fullWidth
                        disabled={true}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={1}>
                  {sellerSearchAddressButton.buttons.map(
                    ({ buttonId, buttonDesc, fieldProps = {} }, i) => (
                      <Button
                        style={{ float: "right" }}
                        disabled={disabled}
                        key={i}
                        {...fieldProps}
                        {...sellerPostCode.openProps}
                      >
                        {buttonDesc}
                      </Button>
                    )
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component={"th"}>
                  <FormLabel>판매자 상세 주소</FormLabel>
                </TableCell>
                <TableCell colSpan={5}>
                  <Controller
                    name="sellerInfo.addressDetail"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value || ""}
                        onChange={onChange}
                        size="small"
                        error={Boolean(errors.sellerInfo)}
                        helperText={
                          errors.sellerInfo && errors.sellerInfo.message
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
  );
};

export default BasicSellerInfo;
