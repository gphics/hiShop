import { createSlice } from "@reduxjs/toolkit";
import { user } from "./utils";

const initialState: user = {
  user: {
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    contact: "",
    username: "",
    transactionAccount: "",
    location: "",
    userImgName: "",
  },
  login: {
    email: "",
    password: "",
  },
};
const main = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});

export const { reducer: userSlice, actions: userSliceActions } = main;
