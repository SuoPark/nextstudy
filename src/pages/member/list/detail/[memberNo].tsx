import { NextPage } from "next";
import { GetServerSideProps, GetServerSidePropsContext } from "next/types";
import React, { useEffect, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import QUERY_KEYS from "@/assets/constants/queries";

import { Box, Button, Card, Tab } from "@mui/material";
import useGetMenuButtons from "@/hooks/useGetMenuButtons";
import { useRouter } from "next/router";
import useTabs from "@/hooks/useTabs";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import fetcher from "@/utils/fetcher";
import BUTTON_CONFIG from "@/assets/api/button";
import API_MEMBER from "@/assets/api/member";

import { IMemberDetailProps } from "@/types/memberTypes";
import { fetchMemberDetail, useMemberDetail } from "@/hooks/queries/useMember";
import FormComp from "@/components/member/FormComp";

import withGetServerSideProps from "@/withServerSideProps";

const MemberDetail: NextPage<IMemberDetailProps> = ({ memberNo }) => {
  //router
  const router = useRouter();
  const { query } = router;

  //useState

  //요약보드 정보
  const [totalAvailablePoint, setTotalAvailablePoint] = useState<number>();
  const [totalIssuedCouponCount, setTotalIssuedCouponCount] =
    useState<number>();
  const [totalUsedCouponCount, setTotalUsedCouponCount] = useState<number>();
  const [totalOrderCount, setTotalOrderCount] = useState<number>();

  //tab
  const tab = useTabs({ initialValue: "INFO" });

  //권한버튼
  const { buttons, setSettingButtons } = useGetMenuButtons({
    initialButtons: [
      {
        buttonId: "view-list",
        fieldProps: BUTTON_CONFIG.BUTTON_LIST,
      },
      {
        buttonId: "member-detail-update",
        fieldProps: BUTTON_CONFIG.BUTTON_UPDATE,
      },
    ],
  });

  //최상단 요약보드 조회
  //초기화
  const callbackBoard = async () => {
    const { url, method } = API_MEMBER.MEMBER_BOARD;
    await fetcher({
      api: { url: `${url}/${memberNo}`, method },
    }).then(({ data }) => {
      if (data.code === "UNAUTHORIZED") {
        router.replace(`/`);
      } else {
        if (data.data.totalAvailablePoint) {
          setTotalAvailablePoint(data.data.totalAvailablePoint);
        } else {
          setTotalAvailablePoint(0);
        }
        if (data.data.totalIssuedCouponCount) {
          setTotalIssuedCouponCount(data.data.totalIssuedCouponCount);
        } else {
          setTotalIssuedCouponCount(0);
        }
        if (data.data.totalUsedCouponCount) {
          setTotalUsedCouponCount(data.data.totalUsedCouponCount);
        } else {
          setTotalUsedCouponCount(0);
        }
        if (data.data.totalOrderCount) {
          setTotalOrderCount(data.data.totalOrderCount);
        } else {
          setTotalOrderCount(0);
        }
      }
    });
  };

  //상세
  const { data } = useMemberDetail(
    { memberNo },
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );

  //handleClick
  //목록,수정버튼
  const handleClick = (buttonId: string) => {
    if (buttonId === "view-list") {
      router.push({
        pathname: `/member/list`,
        query,
      });
    } else if (buttonId === "member-detail-update") {
      router.push(`/member/list/edit/${memberNo}`);
    }
  };

  //useEffect
  useEffect(() => {
    //요약보드 불러오기
    callbackBoard();
    if (query.tap === "POINT") {
      tab.setValue("POINT");
    }
    if (
      data &&
      (data.memberStatusCode === "EXIT" || data.memberStatusCode === "INACTIVE")
    ) {
      //탈퇴 혹은 비활성 멤버인 경우 버튼 비활성
      setSettingButtons([
        {
          buttonId: "view-list",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_LIST,
            ...BUTTON_CONFIG.BUTTON_DISABLED_TRUE,
          },
        },
        {
          buttonId: "member-detail-update",
          fieldProps: {
            ...BUTTON_CONFIG.BUTTON_UPDATE,
            ...BUTTON_CONFIG.BUTTON_DISABLED_TRUE,
          },
        },
      ]);
    }
  }, []);

  return (
    // 상단 제목
    <>
      {tab.value === "INFO" && (
        <Box style={{ fontWeight: "bold" }}>회원정보</Box>
      )}
      {tab.value === "POINT" && (
        <Box style={{ fontWeight: "bold" }}>포인트 이력</Box>
      )}
      {tab.value === "COUPON" && (
        <Box style={{ fontWeight: "bold" }}>쿠폰이력</Box>
      )}
      {tab.value === "ORDER" && (
        <Box style={{ fontWeight: "bold" }}>주문이력</Box>
      )}
      {tab.value === "ONETOONE" && (
        <Box style={{ fontWeight: "bold" }}>1:1문의</Box>
      )}
      {tab.value === "PRODUCT" && (
        <Box style={{ fontWeight: "bold" }}>상품문의</Box>
      )}
      {tab.value === "BUY" && (
        <Box style={{ fontWeight: "bold" }}>구매후기</Box>
      )}
      {tab.value === "HISTORY" && (
        <Box style={{ fontWeight: "bold" }}>변경이력</Box>
      )}
      {/* 요약정보 */}
      {memberNo && (
        <>
          {data && (
            <Box style={{ fontWeight: "bold" }} sx={{ ml: 4, mt: 4, mb: 7 }}>
              회원이름 : {data.memberName} | ID : {data.memberId}
            </Box>
          )}
          {totalAvailablePoint !== 0 && totalAvailablePoint && (
            <Box
              sx={{
                whiteSpace: "pre",
                textAlign: "center",
                p: 10,
                mb: 10,
                border: "3px solid black",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              총 보유포인트 :{" "}
              {totalAvailablePoint
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              P | 총 발급 쿠폰 건수 : {totalIssuedCouponCount}건 | 총 사용 쿠폰
              건수 : {totalUsedCouponCount}건 | 총 주문 건수 : {totalOrderCount}
              건
            </Box>
          )}
          {!totalAvailablePoint && (
            <Box
              sx={{
                whiteSpace: "pre",
                textAlign: "center",
                p: 10,
                mb: 10,
                border: "3px solid black",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              총 보유포인트 : {totalAvailablePoint}P | 총 발급 쿠폰 건수 :{" "}
              {totalIssuedCouponCount}건 | 총 사용 쿠폰 건수 :{" "}
              {totalUsedCouponCount}건 | 총 주문 건수 : {totalOrderCount}건
            </Box>
          )}
        </>
      )}
      <Card>
        <TabContext value={tab.value}>
          <TabList variant="fullWidth" onChange={tab.onChange}>
            <Tab value="INFO" label="회원정보" />
            <Tab value="POINT" label="포인트이력" />
            <Tab value="COUPON" label="쿠폰이력" />
            <Tab value="ORDER" label="주문이력" />
            <Tab value="ONETOONE" label="1:1문의" />
            <Tab value="PRODUCT" label="상품문의" />
            <Tab value="BUY" label="구매후기" />
            <Tab value="HISTORY" label="변경이력" />
          </TabList>
          {/* 상세정보 */}
          {data && (
            <TabPanel value="INFO">
              <FormComp disabled={true} detailData={data || null}>
                {buttons.map(({ buttonId, buttonDesc, fieldProps }) => (
                  <Button
                    key={buttonId}
                    {...fieldProps}
                    size="small"
                    onClick={() => handleClick(buttonId)}
                  >
                    {buttonDesc}
                  </Button>
                ))}
              </FormComp>
            </TabPanel>
          )}
          <TabPanel value="POINT">
            {/* <SearchListProvider
              api={{
                url: `/api/adm/member/points/${memberNo}`,
                method: "get",
              }}
              isEnabled={true}
              isSearchForm={false}
              isQueryString={false}
              isList={true}
            >
              <PointHistory
                memberNo={memberNo}
                callbackBoard={callbackBoard}
                totalAvailablePoint={totalAvailablePoint}
              />
            </SearchListProvider> */}
            Point
          </TabPanel>
          <TabPanel value="COUPON">
            {/* <CouponHistory memberNo={memberNo}></CouponHistory> */}
            COUPON
          </TabPanel>
          <TabPanel value="ORDER">
            {/* <OrderHistory memberNo={memberNo}></OrderHistory> */}
            ORDER
          </TabPanel>
          <TabPanel value="ONETOONE">
            {/* <OneToOneQuestion memberNo={memberNo} /> */}
            ONETOONE
          </TabPanel>
          <TabPanel value="PRODUCT">
            {/* <ProductQuestion memberNo={memberNo} /> */}PRODUCT
          </TabPanel>
          <TabPanel value="BUY">
            {/* <ProductReview memberNo={memberNo} /> */}BUY
          </TabPanel>
          <TabPanel value="HISTORY">
            HISTORY
            {/* <MemberHistory memberNo={memberNo}></MemberHistory> */}
          </TabPanel>
        </TabContext>
      </Card>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withGetServerSideProps(
  async ({ params }: GetServerSidePropsContext) => {
    const queryClient = new QueryClient();
    const { memberNo } = params || {};

    if (memberNo) {
      await queryClient.prefetchQuery(
        [QUERY_KEYS.MEMBER_DETAIL, String(memberNo)],
        () => fetchMemberDetail({ memberNo: String(memberNo) })
      );
    }

    return {
      props: {
        memberNo: String(memberNo),
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);

export default MemberDetail;
