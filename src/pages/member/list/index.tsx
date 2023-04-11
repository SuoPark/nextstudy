import { SearchListProvider } from "@/context/SearchListContext";
import API_MEMBER from "@/assets/api/member";
import MemberListChild from "@/components/member/list/MemberListChild";
const MemberList = () => {
  return (
    <SearchListProvider
      api={API_MEMBER.MEMBER_GET}
      isSearchForm={true}
      isEnabled={true}
      isPaging={true}
      isList={true}
      isQueryString={false}
    >
      <MemberListChild />
    </SearchListProvider>
  );
};

export default MemberList;
