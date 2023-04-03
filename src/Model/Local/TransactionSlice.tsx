import { createSlice } from "@reduxjs/toolkit";
import { transaction } from "./utils";

const initialState: transaction = {
    id:"",
  productId: "",
  sellerId: "",
  buyerId: "",
  price: "",
  quantity: "",
};

const main = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {},
});

export const { reducer: transactionSlice, actions: transactionSliceActions } =
  main;
