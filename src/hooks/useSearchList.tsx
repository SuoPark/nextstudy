import { useContext } from "react";
import { SearchLsitContext } from "@/context/SearchListContext";

export const useSearchList = () => useContext(SearchLsitContext);
