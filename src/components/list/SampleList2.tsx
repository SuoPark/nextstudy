import {
  SearchListProvider,
  SearchLsitContext,
} from "@/context/SearchListContext";
import API_BOARD from "@/assets/api/board";
import DataList from "./DataList";
import QUERY_KEYS from "@/assets/constants/queries";

const SampleList1 = () => {
  return (
    <SearchListProvider
      api={API_BOARD.SAMPLE_LIST2}
      isQueryString={false}
      queryKey={QUERY_KEYS.SAMPLE_LIST2}
    >
      <DataList context={SearchLsitContext} />
    </SearchListProvider>
  );
};

export default SampleList1;
