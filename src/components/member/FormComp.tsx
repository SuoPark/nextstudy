import React, { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetMenuButtons from "@/hooks/useGetMenuButtons";
import { IOptions } from "@/types/common";
import EssentialComp from "../common/EssentialComp";
import usePostCode from "@/hooks/usePostCode";
import seller from "@/assets/constants/seller";

import customerOptions from "@/assets/constants/customer";
import BUTTON_CONFIG from "@/assets/api/button";
import API_MEMBER from "@/assets/api/member";
import API_COUNTRY from "@/assets/api/country";
import fetcher from "@/utils/fetcher";
import { dialogsActions } from "@/store/reducers/dialogsReducer";
import DialogsComp from "../Dialog/DialogComp";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Grid from "@mui/material/Grid";
import { WarningAmberOutlined } from "@mui/icons-material";
import CountryModalComp from "../client/seller/countryModal/CountryModalComp";
import MSG from "@/assets/constants/messages";
import FileUploadComp from "../common/FileUploadComp";

interface IProps {
  children?: ReactNode;
  disabled?: boolean;
  detailData?: any | null;
  onSubmit?: (payload: any) => void;
}

interface ISellerInfo {
  sellerNo: number;
  sellerName: string;
  countryNo: number;
  companyName: string;
  corporationType: string;
  taxType: string;
  businessRegistrationNo: string;
  businessRegistrationImagePath: string;
  mailOrderRegisterNo: string;
  mailOrderRegisterImagePath: string;
  representativeName: string;
  businessKind: string;
  telephoneNo: string;
  faxNo: string;
  businessCondition: string;
  email: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  basicCommissionApplyType: string;
  basicCommissionValue: number;
  contractFileName: string;
  contractFilePath: string;
  accountBankCode: string;
  accountNo: string;
  accountName: string;
  accountImagePath: string;
  accountVerifyYn: string;
  authenticationSellerYn: string;
  useYn: string;
}

interface IEtcDocumentInfo {
  sellerEtcDocumentNo: number;
  documentName: string;
  filePath: string;
  realFileName: string;
}

interface IManagerInfo {
  sellerManagerNo: number;
  managerName: string;
  managerPositionName: string;
  managerDepartmentName: string;
  managerFaxNo: string;
  managerEmail: string;
  managerTelephoneNo: string;
  managerMobilePhoneNo: string;
  managerRole: string;
  mainManagerYn: string;
}

interface ICelebrityInfo {
  celebrityNo: number;
  celebrityName: string;
  countryNo: number;
  realName: string;
  corporationType: string;
  taxType: string;
  businessRegistrationNo: string;
  businessRegistrationImagePath: string;
  mailOrderRegisterNo: string;
  mailOrderRegisterImagePath: string;
  representativeName: string;
  businessKind: string;
  telephoneNo: string;
  businessCondition: string;
  email: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  basicCommissionApplyType: string;
  basicCommissionValue: number;
  contractFileName: string;
  contractFilePath: string;
  accountBankCode: string;
  accountNo: string;
  accountName: string;
  accountImagePath: string;
  accountVerifyYn: string;
  authenticationSellerYn: string;
  useYn: string;
}

interface ICelebrityEtcDocumentInfo {
  celebrityEtcDocumentNo: number;
  documentName: string;
  filePath: string;
  realFileName: string;
}

interface ICelebrityManagerInfo {
  managerName: string;
  managerPositionName: string;
  managerDepartmentName: string;
  managerFaxNo: string;
  managerEmail: string;
  managerTelephoneNo: string;
  managerMobilePhoneNo: string;
  managerRole: string;
  mainManagerYn: string;
}

interface IDuplicateCheck {
  nickNameCheck: boolean;
}

const schema = yup.object().shape({
  // sellerInfo: yup.object().shape({
  //   sellerName:yup.string().required(MSG.ERROR.REQUIRED),
  // }),
  memberName: yup.string().required(MSG.ERROR.REQUIRED),
  nickName: yup.string().required(MSG.ERROR.REQUIRED),
  dateOfBirth1: yup.string().required(MSG.ERROR.REQUIRED),
  dateOfBirth2: yup.string().required(MSG.ERROR.REQUIRED),
  dateOfBirth3: yup.string().required(MSG.ERROR.REQUIRED),
  mobilePhoneNo1: yup.string().required(MSG.ERROR.REQUIRED),
  mobilePhoneNo2: yup.string().required(MSG.ERROR.REQUIRED),
  mobilePhoneNo3: yup.string().required(MSG.ERROR.REQUIRED),
  email: yup.string().required(MSG.ERROR.REQUIRED),
  duplicateCheck: yup.object().shape({
    nickNameCheck: yup.boolean().oneOf([true], " 닉네임 중복확인을 해주세요"),
  }),
});

const FormComp = ({ children, disabled, detailData, onSubmit }: IProps) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  //우편검색
  const postCode = usePostCode();
  const sellerPostCode = usePostCode();
  const celebrityPostCode = usePostCode();

  //성별
  const [isGender, setIsGender] = useState<string>("");
  //국적
  const [isNationality, setIsNationality] = useState<string>("");
  //닉네임
  const [isNickName, setIsNickName] = useState<string>("");

  //국가
  const [countryInfo, setCountryInfo] = useState<any>();

  const [celebrityCountryInfo, setCelebrityCountryInfo] = useState<any>();

  //중복확인
  const [duplicateCheck, setDuplicateCheck] = useState<IDuplicateCheck>({
    nickNameCheck: false,
  });

  //수수료
  const [commissionApplyType, setCommissionApplyType] = useState<any>({
    basicCommissionApplyType: detailData.sellerInfo?.basicCommissionApplyType,
    liveCommissionApplyType: detailData.sellerInfo?.liveCommissionApplyType,
    shortcutCommissionApplyType:
      detailData.sellerInfo?.shortcutCommissionApplyType,
  });

  const [
    celebrityBasicCommissionApplyType,
    setCelebrityBasicCommissionApplyType,
  ] = useState<string>(detailData.celebrityInfo?.basicCommissionApplyType);

  //회원등급
  const [memberGrade, setMemberGrade] = useState<IOptions[]>([]);

  useEffect(() => {
    if (detailData) {
      const {
        lastLoginDatetime,
        memberName,
        memberGradeNo,
        memberGradeName,
        memberStatusCode,
        memberStatusCodeName,
        signChannel,
        memberType,
        memberTypeName,
        nickName,
        memberId,
        password,
        dateOfBirth,
        gender,
        mobilePhoneNo,
        authenticationYn,
        termsAgreementYn,
        email,
        nationality,
        personalInfoUseAgreementYn,
        marketingUseAgreementYn,
        smsReceiveYn,
        emailReceiveYn,
        alimtalkReceiveYn,
        apppushReceiveYn,
        zipcode,
        address,
        addressDetail,
        sellerInfo,
        etcDocumentList,
        mainManager,
        managerList,
        celebrityInfo,
        celebrityEtcDocumentList,
        celebrityMainManager,
        celebrityManagerList,
      } = detailData;
      reset({
        lastLoginDatetime,
        memberName,
        memberGradeNo,
        memberGradeName,
        memberStatusCode,
        memberStatusCodeName,
        signChannel,
        memberType,
        memberTypeName,
        nickName,
        memberId,
        password,
        dateOfBirth,
        gender,
        mobilePhoneNo,
        authenticationYn,
        termsAgreementYn,
        email,
        nationality,
        personalInfoUseAgreementYn,
        marketingUseAgreementYn,
        smsReceiveYn,
        emailReceiveYn,
        alimtalkReceiveYn,
        apppushReceiveYn,
        zipcode,
        address,
        addressDetail,
        sellerInfo,
        etcDocumentList,
        mainManager,
        managerList,
        celebrityInfo,
        celebrityEtcDocumentList,
        celebrityMainManager,
        celebrityManagerList,
      });
    }

    if (detailData?.mobilePhoneNo) {
      setValue("mobilePhoneNo1", detailData.mobilePhoneNo.substring(0, 3));
      setValue("mobilePhoneNo2", detailData.mobilePhoneNo.substring(3, 7));
      setValue("mobilePhoneNo3", detailData.mobilePhoneNo.substring(7, 11));
    }
    if (detailData?.dateOfBirth) {
      setValue("dateOfBirth1", detailData.dateOfBirth.substring(0, 4));
      setValue("dateOfBirth2", detailData.dateOfBirth.substring(4, 6));
      setValue("dateOfBirth3", detailData.dateOfBirth.substring(6, 8));
    }
  }, [detailData]);

  //button
  const duplicateNickNameButton = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "duplicate-nickName-check",
        fieldProps: BUTTON_CONFIG.BUTTON_DELETE,
      },
    ],
  });

  const searchAddressButton = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "search-address-button",
        fieldProps: BUTTON_CONFIG.BUTTON_DELETE,
      },
    ],
  });

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

  const sellerNationButtons = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "seller-nation-button",
        fieldProps: BUTTON_CONFIG.BUTTON_DELETE,
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

  const sellerAccountVerificationButtons = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "seller-account-verificationButton",
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

  //비밀번호 초기화
  const handlePasswordReset = (buttonId: string) => {};

  //닉네임 validation
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

  //Seller 국가 Modal
  const countryModalHandler = () => {
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

  const accountVerifyHandler = () => {
    setValue("accountVerifyYn", "Y");
  };
  const celebrityAccountVerifyHandler = () => {
    setValue("celebrityInfo.accountVerifyYn", "Y");
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

  //회원등급 option
  const memberGradeOptionHandler = async () => {
    const { url, method } = API_MEMBER.MEMBERGRADE_TYPE_LIST;
    await fetcher({
      api: { url, method },
    }).then((r) => {
      if (r.status === 200) {
        const memberGradeOption: IOptions[] = [];
        r.data.data.map((grade: any) => {
          memberGradeOption.push({
            label: grade.customerGradeName,
            value: grade.customerGradeNo,
          });
        });
        setMemberGrade(memberGradeOption);
      }
    });
  };

  //seller 국가 선택
  const countrySelectHandler = async () => {
    const { url, method } = API_COUNTRY.COUNTRY_GET;

    return await fetcher({
      api: {
        url: `${url}/${detailData.sellerInfo.countryNo}`,
        method,
      },
    }).then(({ data }) =>
      setValue("sellerInfo.countryName", data.data?.countryName)
    );
  };

  //celebrity 국가 선택
  const celebrityCountrySelectHandler = async () => {
    const { url, method } = API_COUNTRY.COUNTRY_GET;
    return await fetcher({
      api: {
        url: `${url}/${detailData.celebrityInfo.countryNo}`,
        method,
      },
    }).then(({ data }) =>
      setValue("celebrityInfo.countryName", data.data?.countryName)
    );
  };

  //image
  const [image] = useState<any>({
    businessRegistrationImagePath:
      detailData.sellerInfo?.businessRegistrationImagePath,
    mailOrderRegisterImagePath:
      detailData.sellerInfo?.mailOrderRegisterImagePath,
    contractFilePath: detailData.sellerInfo?.contractFilePath,
    accountImagePath: detailData.sellerInfo?.accountImagePath,
  });

  const [celebrityImage] = useState<any>({
    businessRegistrationImagePath:
      detailData.celebrityInfo?.businessRegistrationImagePath,
    mailOrderRegisterImagePath:
      detailData.celebrityInfo?.mailOrderRegisterImagePath,
    contractFilePath: detailData.celebrityInfo?.contractFilePath,
    accountImagePath: detailData.celebrityInfo?.accountImagePath,
  });

  //useEffect
  useEffect(() => {
    if (errors.sellerInfo) {
      console.log("test");
    }
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

  useEffect(() => {
    if (duplicateCheck) {
      setValue("duplicateCheck", duplicateCheck);
    }
  }, [duplicateCheck]);

  useEffect(() => {
    memberGradeOptionHandler();

    if (detailData.sellerInfo?.countryNo) {
      countrySelectHandler();
    }
    if (detailData.celebrityInfo?.countryNo) {
      celebrityCountrySelectHandler();
    }
  }, []);

  useEffect(() => {
    if (countryInfo) {
      setValue("sellerInfo.countryName", countryInfo.countryName);
      setValue("sellerInfo.countryNo", countryInfo.countryNo);
    }
  }, [countryInfo]);

  useEffect(() => {
    if (celebrityCountryInfo) {
      setValue("celebrityInfo.countryName", celebrityCountryInfo.countryName);
      setValue("celebrityInfo.countryNo", celebrityCountryInfo.countryNo);
    }
  }, [celebrityCountryInfo]);

  useEffect(() => {
    if (postCode.address) {
      setValue("address", postCode.address?.roadAddress);
      setValue("zipcode", postCode.address?.zonecode);
    }
  }, [postCode.openProps]);

  useEffect(() => {
    if (sellerPostCode.address) {
      setValue("sellerInfo.address", sellerPostCode.address?.roadAddress);
      setValue("sellerInfo.zipcode", sellerPostCode.address?.zonecode);
    }
  }, [sellerPostCode.openProps]);

  useEffect(() => {
    if (celebrityPostCode.address) {
      console.log("3");
      setValue("celebrityInfo.address", celebrityPostCode.address?.roadAddress);
      setValue("celebrityInfo.zipcode", celebrityPostCode.address?.zonecode);
    }
  }, [celebrityPostCode.openProps]);

  const [etcDocumentList, setEtcDocumentList] = useState<IEtcDocumentInfo[]>(
    detailData.etcDocumentList
  );
  const [celebrityEtcDocumentList, setCelebrityEtcDocumentList] = useState<
    ICelebrityEtcDocumentInfo[]
  >(detailData.celebrityEtcDocumentList);

  useEffect(() => {
    setValue("etcDocumentList", etcDocumentList);
  }, [etcDocumentList]);

  useEffect(() => {
    setValue("celebrityEtcDocumentList", celebrityEtcDocumentList);
  }, [celebrityEtcDocumentList]);

  const [managerList, setManagerList] = useState<IManagerInfo[]>(
    detailData.managerList
  );
  const [celebrityManagerList, setCelebrityManagerList] = useState<
    ICelebrityManagerInfo[]
  >(detailData.celebrityManagerList);

  useEffect(() => {
    setValue("managerList", managerList);
  }, [managerList]);

  useEffect(() => {
    setValue("celebrityManagerList", celebrityManagerList);
  }, [celebrityManagerList]);
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
      sellerAccountVerificationButtons.setSettingButtons([
        {
          buttonId: "seller-account-verificationButton",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_DELETE,
            ...BUTTON_CONFIG.BUTTON_TEXT_WHITE,
          },
        },
      ]);
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
    <form autoComplete="off" onSubmit={onSubmit && handleSubmit(onSubmit)}>
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
                          helperText={
                            errors.password && errors.password.message
                          }
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
                          helperText={
                            errors.nickName && errors.nickName.message
                          }
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
                            errors.mobilePhoneNo1 &&
                            errors.mobilePhoneNo1.message
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
                            errors.mobilePhoneNo2 &&
                            errors.mobilePhoneNo2.message
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
                            errors.mobilePhoneNo3 &&
                            errors.mobilePhoneNo3.message
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
                          checked={
                            detailData.personalInfoUseAgreementYn === "Y"
                          }
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
      {detailData.memberType === "SELLER" && (
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
                              onChange={(_, newValue) =>
                                onChange(newValue?.value)
                              }
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
                              onChange={(_, newValue) =>
                                onChange(newValue?.value)
                              }
                              value={
                                seller.taxTypeCode.find(
                                  (opt) => opt.value === value
                                ) || seller.taxTypeCode[0]
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="sellerInfo.taxType"
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
                                attachedFiles={
                                  image.businessRegistrationImagePath
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
          <Card sx={{ mt: "10px" }}>
            <CardHeader
              title="계약 정보"
              titleTypographyProps={{ variant: "h6" }}
            />
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
                      {commissionApplyType.basicCommissionApplyType ===
                        "RATE" && (
                        <TableCell colSpan={1}>
                          <Controller
                            name="sellerInfo.basicCommissionValue"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                type={"number"}
                                value={value}
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
                      {commissionApplyType.basicCommissionApplyType ===
                        "AMOUNT" && (
                        <TableCell colSpan={1}>
                          <Controller
                            name="sellerInfo.basicCommissionValue"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                type={"number"}
                                value={value}
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

                      {commissionApplyType.liveCommissionApplyType ===
                        "RATE" && (
                        <TableCell colSpan={2}>
                          <Controller
                            name="sellerInfo.liveCommissionValue"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                type={"number"}
                                value={value}
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
                      {commissionApplyType.liveCommissionApplyType ===
                        "AMOUNT" && (
                        <TableCell colSpan={2}>
                          <Controller
                            name="sellerInfo.liveCommissionValue"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
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
                      {commissionApplyType.shortcutCommissionApplyType ===
                        "RATE" && (
                        <TableCell colSpan={1}>
                          <Controller
                            name="sellerInfo.shortcutCommissionValue"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                type={"number"}
                                value={value}
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
                                value={value}
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
                                value={value}
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
                    {/*</Table>*/}
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
            {/* <EtcDocumentList
              etc={etcDocumentList}
              callbackEtc={setEtcDocumentList}
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
                          name="mainManager.managerName"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value || ""}
                              onChange={onChange}
                              size="small"
                              error={Boolean(errors.mainManager)}
                              helperText={
                                errors.mainManager && errors.mainManager.message
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
                          name="mainManager.managerPositionName"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value || ""}
                              onChange={onChange}
                              size="small"
                              error={Boolean(errors.mainManager)}
                              helperText={
                                errors.mainManager && errors.mainManager.message
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
                          name="mainManager.managerDepartmentName"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value || ""}
                              onChange={onChange}
                              size="small"
                              error={Boolean(errors.mainManager)}
                              helperText={
                                errors.mainManager && errors.mainManager.message
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
                          name="mainManager.managerFaxNo"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value || ""}
                              onChange={onChange}
                              size="small"
                              error={Boolean(errors.mainManager)}
                              helperText={
                                errors.mainManager && errors.mainManager.message
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
                          name="mainManager.managerEmail"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value || ""}
                              onChange={onChange}
                              size="small"
                              error={Boolean(errors.mainManager)}
                              helperText={
                                errors.mainManager && errors.mainManager.message
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
                          name="mainManager.managerTelephoneNo"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value || ""}
                              onChange={onChange}
                              size="small"
                              error={Boolean(errors.mainManager)}
                              helperText={
                                errors.mainManager && errors.mainManager.message
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
                          name="mainManager.managerMobilePhoneNo"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value || ""}
                              onChange={onChange}
                              size="small"
                              error={Boolean(errors.mainManager)}
                              helperText={
                                errors.mainManager && errors.mainManager.message
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
                          name="mainManager.managerRole"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value || ""}
                              onChange={onChange}
                              size="small"
                              error={Boolean(errors.mainManager)}
                              helperText={
                                errors.mainManager && errors.mainManager.message
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
            {/* <ManagerList
              managerInfo={managerList}
              callbackManager={setManagerList}
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
      )}
      {detailData.memberType === "CELEBRITY" && (
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                              onChange={(_, newValue) =>
                                onChange(newValue?.value)
                              }
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
                              onChange={(_, newValue) =>
                                onChange(newValue?.value)
                              }
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
                                errors.celebrityInfo &&
                                errors.celebrityInfo.message
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
      )}
    </form>
  );
};

export default FormComp;
