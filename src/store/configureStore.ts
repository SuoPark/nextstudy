import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });
  return store;
};

const wrapper = createWrapper(createStore);
export default wrapper;
