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
import FileUploadComp from "@/components/common/FileUploadComp";
import { Address } from "react-daum-postcode";

interface IProps {
  control: any;
  errors: any;
  detailData: any;
  setValue: any;
  disabled: boolean | undefined;
  celebrityImage: any;
}

const CelebrityContractInfo = ({
  control,
  errors,
  detailData,
  setValue,
  disabled,
  celebrityImage,
}: IProps) => {
  const [
    celebrityBasicCommissionApplyType,
    setCelebrityBasicCommissionApplyType,
  ] = useState<string>(detailData.celebrityInfo?.basicCommissionApplyType);

  const celebrityAccountVerificationButtons = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "celebrity-account-verificationButton",
        fieldProps: BUTTON_CONFIG.BUTTON_DELETE,
      },
    ],
  });

  const celebrityAccountVerifyHandler = () => {
    setValue("celebrityInfo.accountVerifyYn", "Y");
  };

  //비활성화 해제시
  useEffect(() => {
    if (!disabled) {
      //셀럽
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
    <Card sx={{ mt: "10px" }}>
      <CardHeader title="계약 정보" titleTypographyProps={{ variant: "h6" }} />
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
                          setCelebrityBasicCommissionApplyType(newValue?.value);
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
                            errors.celebrityInfo && errors.celebrityInfo.message
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
  );
};
export default CelebrityContractInfo;
