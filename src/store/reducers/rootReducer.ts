import type { AnyAction, CombinedState } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import breadcrumbsReducer, {
  IBreadcrumbsStateType,
} from "./breadcrumbsReducer";
import dialogsReducer, { IDialogsStateType } from "./dialogsReducer";

interface ReducerState {
  breadcrumbs: IBreadcrumbsStateType;
  dialogs: IDialogsStateType;
}

const rootReducer = (
  state: any,
  action: AnyAction
): CombinedState<ReducerState> => {
  switch (action.type) {
    default:
      return combineReducers({
        breadcrumbs: breadcrumbsReducer,
        dialogs: dialogsReducer,
      })(state, action);
  }
};

export default rootReducer;
