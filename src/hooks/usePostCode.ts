import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { PostcodeOptions, Address } from "react-daum-postcode/lib/loadPostcode";

interface IProps {
  postcodeOptions?: PostcodeOptions;
}

const usePostCode = function ({ postcodeOptions = {} }: IProps = {}) {
  //주소
  const [address, setAddRess] = useState<Address | null>(null);

  //api open
  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  //선택완료시 주소 변경
  const handleComplete = (data: any) => {
    setAddRess(data);
  };

  //우편번호 버튼 선택
  const onClick = () => {
    open({
      width: 500,
      height: 500,
      popupTitle: "우편번호 검색 팝업",
      onComplete: handleComplete,
      ...postcodeOptions,
    });
  };

  return {
    openProps: {
      onClick,
    },
    embedProps: {
      onComplete: handleComplete,
    },
    address,
  };
};

export default usePostCode;
