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
import FileUploadComp from "@/components/common/FileUploadComp";

interface IProps {
  control: any;
  errors: any;
  detailData: any;
  setValue: any;
  disabled: boolean | undefined;
  image: any;
}

const SellerContractInfo = ({
  control,
  errors,
  detailData,
  setValue,
  disabled,
  image,
}: IProps) => {
  //수수료
  const [commissionApplyType, setCommissionApplyType] = useState<any>({
    basicCommissionApplyType: detailData.sellerInfo?.basicCommissionApplyType,
    liveCommissionApplyType: detailData.sellerInfo?.liveCommissionApplyType,
    shortcutCommissionApplyType:
      detailData.sellerInfo?.shortcutCommissionApplyType,
  });
  //계정 중복체크
  const accountVerifyHandler = () => {
    setValue("accountVerifyYn", "Y");
  };
  //판매자 계정 확인 버튼
  const sellerAccountVerificationButtons = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "seller-account-verificationButton",
        fieldProps: BUTTON_CONFIG.BUTTON_DELETE,
      },
    ],
  });
  //비활성화 해제시
  useEffect(() => {
    if (!disabled) {
      //판매자
      sellerAccountVerificationButtons.setSettingButtons([
        {
          buttonId: "seller-account-verificationButton",
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
      <CardHeader title="계약 정보" titleTypographyProps={{ variant: "h6" }} />
      <CardContent>
        <TableContainer>
          <Table>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col />
            </colgroup>
            <TableBody>
              <TableRow>
                <TableCell component={"th"}>
                  <FormLabel>기본수수료</FormLabel>
                </TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="sellerInfo.basicCommissionApplyType"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        options={seller.CommissionTypeCode}
                        getOptionLabel={(option) => option.label}
                        onChange={(_, newValue: any) => {
                          setCommissionApplyType({
                            ...commissionApplyType,
                            basicCommissionApplyType: newValue?.value,
                          });
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
                            name="sellerInfo.basicCommissionApplyType"
                          />
                        )}
                        size="small"
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                {commissionApplyType.basicCommissionApplyType === "RATE" && (
                  <TableCell colSpan={1}>
                    <Controller
                      name="sellerInfo.basicCommissionValue"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type={"number"}
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
                )}
                {commissionApplyType.basicCommissionApplyType === "AMOUNT" && (
                  <TableCell colSpan={1}>
                    <Controller
                      name="sellerInfo.basicCommissionValue"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type={"number"}
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
                )}
                <TableCell component={"th"} colSpan={1}>
                  <FormLabel>라이브수수료</FormLabel>
                </TableCell>
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.liveCommissionApplyType"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        options={seller.CommissionTypeCode}
                        getOptionLabel={(option) => option.label}
                        onChange={(_, newValue: any) => {
                          setCommissionApplyType({
                            ...commissionApplyType,
                            liveCommissionApplyType: newValue?.value,
                          });
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
                            name="sellerInfo.liveCommissionApplyType"
                          />
                        )}
                        size="small"
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>

                {commissionApplyType.liveCommissionApplyType === "RATE" && (
                  <TableCell colSpan={2}>
                    <Controller
                      name="sellerInfo.liveCommissionValue"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type={"number"}
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
                )}
                {commissionApplyType.liveCommissionApplyType === "AMOUNT" && (
                  <TableCell colSpan={2}>
                    <Controller
                      name="sellerInfo.liveCommissionValue"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value || ""}
                          type={"number"}
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
                )}
              </TableRow>
              <TableRow>
                <TableCell component={"th"}>
                  <FormLabel>숏컷 수수료</FormLabel>
                </TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="sellerInfo.shortcutCommissionApplyType"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        options={seller.CommissionTypeCode}
                        getOptionLabel={(option) => option.label}
                        onChange={(_, newValue: any) => {
                          setCommissionApplyType({
                            ...commissionApplyType,
                            shortcutCommissionApplyType: newValue?.value,
                          });
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
                            name="sellerInfo.shortcutCommissionApplyType"
                          />
                        )}
                        size="small"
                        disabled={disabled}
                      />
                    )}
                  />
                </TableCell>
                {commissionApplyType.shortcutCommissionApplyType === "RATE" && (
                  <TableCell colSpan={1}>
                    <Controller
                      name="sellerInfo.shortcutCommissionValue"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type={"number"}
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
                )}
                {commissionApplyType.shortcutCommissionApplyType ===
                  "AMOUNT" && (
                  <TableCell colSpan={1}>
                    <Controller
                      name="sellerInfo.shortcutCommissionValue"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type={"number"}
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
                )}
                <TableCell sx={{ minWidth: "170px" }}>
                  <FormLabel>인증판매사여부</FormLabel>
                </TableCell>
                <TableCell colSpan={1}>
                  <FormControl>
                    <Controller
                      name="sellerInfo.authenticationSellerYn"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Switch
                          value={value || ""}
                          checked={value === "Y"}
                          onChange={({ target: { checked } }) =>
                            onChange(checked ? "Y" : "N")
                          }
                          disabled={disabled}
                        />
                      )}
                    />
                  </FormControl>
                </TableCell>
                <TableCell sx={{ minWidth: "100px" }}>
                  <FormLabel>계약서</FormLabel>
                </TableCell>
                <TableCell colSpan={3}>
                  <Controller
                    name="sellerInfo.contractFilePath"
                    control={control}
                    render={({ field: { onChange } }) => {
                      return (
                        <FileUploadComp
                          buttonStyle={{
                            width: "140px",
                            marginTop: "25px",
                          }}
                          uploadIcon
                          attachedFiles={image.contractFilePath}
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
                <TableCell component={"th"} colSpan={1}>
                  <FormLabel>정산계좌정보</FormLabel>
                </TableCell>
                <TableCell colSpan={1}>
                  <Controller
                    name="sellerInfo.accountBankCode"
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
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.accountNo"
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
                <TableCell colSpan={1}>
                  <Controller
                    name="sellerInfo.accountName"
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
                <TableCell colSpan={2}>
                  <Controller
                    name="sellerInfo.accountImagePath"
                    control={control}
                    render={({ field: { onChange } }) => {
                      return (
                        <FileUploadComp
                          buttonStyle={{
                            width: "140px",
                            marginTop: "25px",
                          }}
                          uploadIcon
                          attachedFiles={image.accountImagePath}
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
                  {sellerAccountVerificationButtons.buttons.map(
                    ({ buttonId, buttonDesc, fieldProps }) => (
                      <Button
                        key={buttonId}
                        {...fieldProps}
                        disabled={disabled}
                        onClick={accountVerifyHandler}
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
  );
};

export default SellerContractInfo;
