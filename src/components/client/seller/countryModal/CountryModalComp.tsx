import React, { useState } from "react";
import { SearchListProvider } from "@/context/SearchListContext";
import { Card, CardContent, Grid } from "@mui/material";
import API_COUNTRY from "@/assets/api/country";

import { useDispatch } from "react-redux";
import DefaultListComp from "@/components/list/DefaultListComp";
import SearchFormComp from "@/components/search/SearchFormComp";
import { dialogsActions } from "@/store/reducers/dialogsReducer";

interface IProps {
  callbackData: (payload: any) => void;
}

const CountryModalComp = ({ callbackData }: IProps) => {
  const dispatch = useDispatch();

  const handleLinkCallback = (payload: { [key: string]: any }) => {
    callbackData && callbackData(payload);
    dispatch(dialogsActions.clear({}));
  };

  const [nodeItems] = useState([
    {
      nodeType: "TEXT_FIELD",
      id: "countryName",
      xs: 10,
      label: "국가명",
    },
  ]);

  const [columns] = useState([
    { id: "countryNo", label: "번호" },
    {
      id: "countryFlag",
      label: "국기",
      comp: (payload: { [key: string]: any }) => {
        return (
          <img
            width={50}
            height={50}
            src={`${process.env.NEXT_PUBLIC_S3_URL}/${payload.countryFlag}`}
            alt={"countryFlag"}
            onError={({ currentTarget }) => {
              currentTarget.src = `/images/no_image.png`;
            }}
          />
        );
      },
    },
    { id: "countryName", label: "한글국가명" },
    { id: "countryNameEng", label: "영문국가명" },
  ]);

  return (
    <SearchListProvider
      api={API_COUNTRY.COUNTRY_LIST}
      isEnabled={true}
      isQueryString={false}
    >
      <Grid container rowSpacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <SearchFormComp nodeItems={nodeItems} defaultValues={{}} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <DefaultListComp
              columns={columns}
              isLineClick={true}
              handleLinkCallback={handleLinkCallback}
            />
          </Card>
        </Grid>
      </Grid>
    </SearchListProvider>
  );
};

export default CountryModalComp;
