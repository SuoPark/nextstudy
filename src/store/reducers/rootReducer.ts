import type { AnyAction, CombinedState } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import sampleList1Reducer, { ISampleList1Type } from "./sampleList1Reducer";
import sampleList2Reducer, { ISampleList2Type } from "./sampleList2Reducer";

interface ReducerState {
  sampleList1: ISampleList1Type;
  sampleList2: ISampleList2Type;
}

const rootReducer = (
  state: any,
  action: AnyAction
): CombinedState<ReducerState> => {
  switch (action.type) {
    default:
      return combineReducers({
        sampleList1: sampleList1Reducer,
        sampleList2: sampleList2Reducer,
      })(state, action);
  }
};

export default rootReducer;
