import {
  SearchListProvider,
  SearchLsitContext,
} from "@/context/SearchListContext";
import API_BOARD from "@/assets/api/board";
import DataList from "./DataList";
import QUERY_KEYS from "@/assets/constants/queries";

const SampleList3 = () => {
  return (
    <SearchListProvider
      api={API_BOARD.SAMPLE_LIST3}
      isQueryString={false}
      queryKey={QUERY_KEYS.SAMPLE_LIST3}
    >
      <DataList context={SearchLsitContext} />
    </SearchListProvider>
  );
};

export default SampleList3;
