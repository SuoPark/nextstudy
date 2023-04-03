import type { AnyAction, CombinedState } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import breadcrumbsReducer, {
  IBreadcrumbsStateType,
} from "./breadcrumbsReducer";

interface ReducerState {
  breadcrumbs: IBreadcrumbsStateType;
}

const rootReducer = (
  state: any,
  action: AnyAction
): CombinedState<ReducerState> => {
  switch (action.type) {
    default:
      return combineReducers({
        breadcrumbs: breadcrumbsReducer,
      })(state, action);
  }
};

export default rootReducer;
