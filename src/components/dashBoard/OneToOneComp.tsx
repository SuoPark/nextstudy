import API_BOARD from "@/assets/api/board";
import { SearchListProvider } from "@/context/SearchListContext";
import { Square as SquareIcon } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Card, CardHeader, Tab } from "@mui/material";
import useTabs from "./../../hooks/useTabs";
import CelebrityOneToOneQuestionComp from "./ALLOneToOneQuestionComp";
import CustomerOneToOneQuestionComp from "./CustomerOneToOneQuestionComp";
import ALLOneToOneQuestionComp from "./ALLOneToOneQuestionComp";
const OneToOneComp = () => {
  const tab = useTabs({ initialValue: "1" });
  return (
    <>
      <Grid item key="1대1문의 미답변" xs={6}>
        <Card>
          <CardHeader
            titleTypographyProps={{
              fontSize: "subtitle1.fontSize",
              fontWeight: "medium",
            }}
            avatar={<SquareIcon fontSize="small" />}
            title={`1:1문의 미답변`}
          />
          <TabContext value={tab.value}>
            <TabList sx={{ float: "right", pb: 5 }} onChange={tab.onChange}>
              <Tab value="1" label="일반회원" />
              <Tab value="2" label="셀럽" />
              <Tab value="3" label="전체" />
            </TabList>
            <SearchListProvider
              api={API_BOARD.ONE_TO_ONE_QUESTION_LIST}
              exValues={{ questionStatus: "WAIT", customerType: "NORMAL" }}
              isSearchForm={false}
              isEnabled={true}
              isPaging={false}
              isList={true}
              isQueryString={false}
            >
              <TabPanel value="1">
                <CustomerOneToOneQuestionComp />
              </TabPanel>
            </SearchListProvider>
            <SearchListProvider
              api={API_BOARD.ONE_TO_ONE_QUESTION_LIST}
              exValues={{ questionStatus: "WAIT", customerType: "CELEBRITY" }}
              isSearchForm={false}
              isEnabled={true}
              isPaging={false}
              isList={true}
              isQueryString={false}
            >
              <TabPanel value="2">
                <CelebrityOneToOneQuestionComp />
              </TabPanel>
            </SearchListProvider>
            <SearchListProvider
              api={API_BOARD.ONE_TO_ONE_QUESTION_LIST}
              exValues={{ questionStatus: "WAIT" }}
              isSearchForm={false}
              isEnabled={true}
              isPaging={false}
              isList={true}
              isQueryString={false}
            >
              <TabPanel value="3">
                <ALLOneToOneQuestionComp />
              </TabPanel>
            </SearchListProvider>
          </TabContext>
        </Card>
      </Grid>
    </>
  );
};

export default OneToOneComp;
