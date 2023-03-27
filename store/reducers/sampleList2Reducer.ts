import { createSlice } from "@reduxjs/toolkit";

export interface ISampleList2 {
  index: number;
  subject: string;
  writer: string;
  createDate: string;
  views: number;
}

export interface ISampleList2Type {
  sampleList2: ISampleList2[];
}

const initialState: ISampleList2Type = {
  sampleList2: [],
};

const actions = {
  GET_LIST: "getList",
};

const slice = createSlice({
  name: "sampleList2",
  initialState,
  reducers: {
    [actions.GET_LIST](state, { payload: { sampleList2 } }) {
      state.sampleList2 = [...state.sampleList2, sampleList2];
    },
  },
});

export const sampleList2Actions = slice.actions;
export default slice.reducer;
