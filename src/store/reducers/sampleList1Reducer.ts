import { createSlice } from "@reduxjs/toolkit";

export interface ISampleList1 {
  index: number;
  subject: string;
  writer: string;
  createDate: string;
  views: number;
}

export interface ISampleList1Type {
  sampleList1: ISampleList1[];
}

const initialState: ISampleList1Type = {
  sampleList1: [],
};

const actions = {
  GET_LIST: "getList",
};

const slice = createSlice({
  name: "sampleList1",
  initialState,
  reducers: {
    [actions.GET_LIST](state, { payload: { sampleList1 } }) {
      state.sampleList1 = [...state.sampleList1, sampleList1];
    },
  },
});

export const sampleList1Actions = slice.actions;
export default slice.reducer;
