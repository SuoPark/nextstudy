import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormLabel,
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
  celebrityImage: any;
}
const BasicCelebrityInfo = ({
  control,
  errors,
  disabled,
  setCelebrityCountryInfo,
  celebrityPostCode,
  celebrityImage,
}: IProps) => {
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
    </>
  );
};
export default BasicCelebrityInfo;
