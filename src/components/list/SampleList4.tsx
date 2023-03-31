import {
  SearchListProvider,
  SearchLsitContext,
} from "@/context/SearchListContext";
import API_BOARD from "@/assets/api/board";
import DataList from "./DataList";
import QUERY_KEYS from "@/assets/constants/queries";

const SampleList4 = () => {
  return (
    <SearchListProvider
      api={API_BOARD.SAMPLE_LIST4}
      isQueryString={false}
      queryKey={QUERY_KEYS.SAMPLE_LIST4}
    >
      <DataList context={SearchLsitContext} />
    </SearchListProvider>
  );
};

export default SampleList4;
