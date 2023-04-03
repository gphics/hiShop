import { createSlice } from "@reduxjs/toolkit";
import { review } from "./utils";

const initialState: review = {
  creator: "",
  body: "",
  productId: "",
};

const main = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
});

export const { reducer: reviewSlice, actions: reviewSliceActions } = main;
