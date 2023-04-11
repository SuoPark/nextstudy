import DefaultListComp from "@/components/list/DefaultListComp";
import SearchFormComp from "@/components/search/SearchFormComp";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import customersOptions from "@/assets/constants/customer";
import { useEffect, useState } from "react";
import fetcher from "@/utils/fetcher";
import { IOptions } from "@/types/common";
import API_MEMBER from "@/assets/api/member";
import router from "next/router";

const MemberListChild = () => {
  //회원목록 컬럼
  const [columns] = useState([
    {
      id: "rowNo", //구분
      label: "번호", //표시이름
      theadCellFieldProps: { style: { minWidth: 100, maxWidth: 100 } }, //속성
    },
    {
      id: "memberId",
      label: "아이디",
      isLink: true, //클릭가능한 링크 여부
      theadCellFieldProps: { style: { minWidth: 200, maxWidth: 200 } },
    },
    {
      id: "blackConsumerYn",
      label: "블랙컨슈머",
      comp: (
        row: any //렌더 내용
      ) => (
        <>
          {row.blackConsumerYn === "Y" ? (
            <Button
              variant="outlined"
              color="info"
              size="small"
              style={{ color: "#6ACDFF" }}
              //   onClick={() => showBlackConsumer(row.memberNo)}
            >
              보기
            </Button>
          ) : (
            <>해당없음</>
          )}
        </>
      ),
    },
    {
      id: "memberGradeName",
      label: "회원등급",
      theadCellFieldProps: { style: { minWidth: 100, maxWidth: 100 } },
    },
    {
      id: "memberTypeName",
      label: "회원타입",
      theadCellFieldProps: { style: { minWidth: 100, maxWidth: 100 } },
    },
    {
      id: "memberName",
      label: "성명",
      theadCellFieldProps: { style: { minWidth: 200, maxWidth: 200 } },
    },
    {
      id: "ageAndGender",
      label: "연령대/성별",
      theadCellFieldProps: { style: { minWidth: 200, maxWidth: 200 } },
    },
    {
      id: "totalAvailablePoint",
      label: "가용포인트",
      comp: (payload: { [key: string]: any }) => {
        if (payload.totalAvailablePoint) {
          return payload.totalAvailablePoint
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          return payload.totalAvailablePoint;
        }
      },
    },
    {
      id: "email",
      label: "이메일",
      theadCellFieldProps: { style: { minWidth: 200, maxWidth: 200 } },
    },
    {
      id: "memberStatusCodeName",
      label: "계정상태",
      theadCellFieldProps: { style: { minWidth: 100, maxWidth: 100 } },
    },
    {
      id: "createDatetime",
      label: "등록일시",
      theadCellFieldProps: { style: { minWidth: 200, maxWidth: 200 } },
    },
    {
      id: "lastLoginDatetime",
      label: "최종로그인",
      theadCellFieldProps: { style: { minWidth: 200, maxWidth: 200 } },
    },
    {
      id: "memberNo",
      label: "비번",
      theadCellFieldProps: { style: { minWidth: 100, maxWidth: 100 } },
      comp: (row: any) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          style={{ color: "#FF4C51" }}
          //   onClick={() => handleResetButton(row.memberNo)}
        >
          초기화
        </Button>
      ),
    },
  ]);

  //검색창 목록
  const [searchItems, setSearchItems] = useState([
    {
      nodeType: "DATE_RANGE_PICKER", //종류
      id: "createDatetime", //구분
      xs: 3, //크기
      label: "가입일", //이름
      nodeOptions: {
        //옵션
        ids: ["createDatetimeFrom", "createDatetimeTo"], //하위노드 구분
      },
    },
    {
      nodeType: "AUTO_COMPLETE",
      id: "customerType",
      label: "계정상태",
      xs: 3,
      nodeOptions: {
        options: customersOptions.customerType,
      },
    },
    {
      nodeType: "AUTO_COMPLETE",
      id: "blackConsumerYn",
      label: "블랙컨슈머여부",
      xs: 3,
      nodeOptions: {
        options: customersOptions.blackConsumerYn,
      },
    },
    {
      nodeType: "COMPLEX", //복합타입
      id: "search",
      nodeOptions: {
        childNode: [
          //하위에 들어갈 종류를 나열
          {
            nodeType: "AUTO_COMPLETE",
            id: "searchType",
            xs: 3,
            label: "전체",
            nodeOptions: {
              options: [
                { label: "전체", value: "all" },
                { label: "등록자", value: "creatorName" },
              ],
            },
          },
          {
            nodeType: "TEXT_FIELD",
            id: "searchKeyword",
            xs: 5,
            label: "검색어",
          },
        ],
      },
    },
  ]);

  //회원 선택시 상세페이지 이동
  const handleLinkCallback = ({ memberNo }: { memberNo: number }) => {
    router.push(`/member/list/detail/${memberNo}`);
  };

  //회원등급 목록 조회
  //handler
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
        setSearchItems([
          {
            nodeType: "DATE_RANGE_PICKER",
            id: "createDatetime",
            xs: 3,
            label: "가입일",
            nodeOptions: {
              ids: ["createDatetimeFrom", "createDatetimeTo"],
            },
          },
          {
            nodeType: "AUTO_COMPLETE",
            id: "memberStatusCode",
            label: "계정상태",
            xs: 3,
            nodeOptions: {
              options: customersOptions.customerStatusCode,
            },
          },
          {
            nodeType: "AUTO_COMPLETE",
            id: "memberGradeNo",
            label: "회원등급",
            xs: 3,
            nodeOptions: {
              options: memberGradeOption,
            },
          },
          {
            nodeType: "AUTO_COMPLETE",
            id: "blackConsumerYn",
            label: "블랙컨슈머여부",
            xs: 3,
            nodeOptions: {
              options: customersOptions.blackConsumerYn,
            },
          },
          {
            nodeType: "COMPLEX",
            id: "search",
            nodeOptions: {
              childNode: [
                {
                  nodeType: "AUTO_COMPLETE",
                  id: "searchType",
                  xs: 3,
                  label: "전체",
                  nodeOptions: {
                    options: [
                      { label: "전체", value: "all" },
                      { label: "성명", value: "memberName" },
                      { label: "아이디", value: "memberId" },
                      { label: "이메일", value: "email" },
                    ],
                  },
                },
                {
                  nodeType: "TEXT_FIELD",
                  id: "searchKeyword",
                  xs: 9,
                  label: "검색어",
                },
              ],
            },
          },
        ]);
      }
    });
  };

  //useEffect
  //검색창 최신화
  useEffect(() => {
    memberGradeOptionHandler();
  }, []);

  return (
    <Grid container rowSpacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="회원목록" />
          <CardContent>
            <SearchFormComp nodeItems={searchItems} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <DefaultListComp
            columns={columns}
            visibleCheckBox={true}
            handleLinkCallback={handleLinkCallback}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default MemberListChild;
