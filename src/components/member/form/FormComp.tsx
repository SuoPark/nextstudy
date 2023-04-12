import React, { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetMenuButtons from "@/hooks/useGetMenuButtons";
import { IOptions } from "@/types/common";

import usePostCode from "@/hooks/usePostCode";

import BUTTON_CONFIG from "@/assets/api/button";
import API_MEMBER from "@/assets/api/member";
import API_COUNTRY from "@/assets/api/country";
import fetcher from "@/utils/fetcher";
import { dialogsActions } from "@/store/reducers/dialogsReducer";
import DialogsComp from "../../Dialog/DialogComp";
import { useDispatch } from "react-redux";

import CountryModalComp from "../../client/seller/countryModal/CountryModalComp";
import MSG from "@/assets/constants/messages";

import BasicInfo from "../form/BasicInfo";

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

//유효성
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

  const sellerPostCode = usePostCode(); //판매자주소
  const celebrityPostCode = usePostCode(); //셀럽주소

  //국가
  const [countryInfo, setCountryInfo] = useState<any>();

  const [celebrityCountryInfo, setCelebrityCountryInfo] = useState<any>();

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

  //정보 변경시 마다
  useEffect(() => {
    if (detailData) {
      //불러온 데이터로부터 데이터 분리
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
      //해당 값으로 form 초기화
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

  //판매자 국가 버튼
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

  //판매자 계정 확인 버튼
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

  //최초 로드시 회원등급 종류 load
  useEffect(() => {
    memberGradeOptionHandler();
    //국가 코드가 있는 경우 설정
    if (detailData.sellerInfo?.countryNo) {
      countrySelectHandler();
    }
    if (detailData.celebrityInfo?.countryNo) {
      celebrityCountrySelectHandler();
    }
  }, []);

  //국가코드를 통해 국가정보를 불러온 경우 form에 해당 정보 세팅
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

  //기타 증빙서류
  const [etcDocumentList, setEtcDocumentList] = useState<IEtcDocumentInfo[]>(
    detailData.etcDocumentList
  );
  const [celebrityEtcDocumentList, setCelebrityEtcDocumentList] = useState<
    ICelebrityEtcDocumentInfo[]
  >(detailData.celebrityEtcDocumentList);

  //증빙서류 form 업데이트
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
      <BasicInfo
        control={control}
        errors={errors}
        detailData={detailData}
        setValue={setValue}
        disabled={disabled}
        memberGrade={memberGrade}
      >
        {children}
      </BasicInfo>
    </form>
  );
};

export default FormComp;
