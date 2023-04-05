import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface IDialogsStateType {
  dialogs: IDialog[];
}

export interface IDialog {
  id: string;
  comp: ReactNode;
}

const initialState: IDialogsStateType = {
  dialogs: [],
};

const actionTypes = {
  SET_DIALOG: "setDialog",
  REMOVE_DIALOG: "removeDialog",
  CLEAR: "clear",
};

/**
 * @category store
 * @subcategory dialogsReducer
 * @description 모달 정보를 관리하는 reducer
 */
const slice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    [actionTypes.SET_DIALOG](state, { payload: { id, comp } }) {
      state.dialogs = [...state.dialogs, { id, comp }];
    },
    [actionTypes.REMOVE_DIALOG](state, { payload: { id } }) {
      state.dialogs = state.dialogs.filter((dialog) => dialog.id !== id);
    },
    [actionTypes.CLEAR](state) {
      state.dialogs = [];
    },
  },
});

export const dialogsActions = slice.actions;
export default slice.reducer;
