import {
  SearchListProvider,
  SearchLsitContext,
} from "@/context/SearchListContext";
import API_BOARD from "@/assets/api/board";
import DataList from "./DataList";

const SampleList1 = () => {
  return (
    <SearchListProvider
      api={API_BOARD.SAMPLE_LIST1}
      isQueryString={false}
      queryKey="sampleList1"
    >
      <DataList context={SearchLsitContext} />
    </SearchListProvider>
  );
};

export default SampleList1;
