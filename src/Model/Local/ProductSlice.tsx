import { createSlice } from "@reduxjs/toolkit";
import { product } from "./utils";

const initialState: product = {
  name: "",
  description: "",
  price: "",
  quantity: "",
  images: [],
  seller: "",
  buyersId: [],
  id: "",
};

const main = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
});

export const { reducer: productSlice, actions: productSliceActions } = main;
