import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { review } from "./utils";
import hiShopSupabase from "../Remote/hiShop";

const initialState: review = {
  main: { img: "", id: "", creatorName: "", body: "", creatorImgName: "" },
  allReviews: [],
  productId:""
};

export const instantiateCreateReviews = createAsyncThunk("createReviews", async (id: string, thunkAPI: any) => {
  const main = { allReviews: [], productId: id }
  const { data, error } = await hiShopSupabase.from("reviews")
    .insert(main).select()
    .single()
  if(data) return data
})

const main = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  
});

export const { reducer: reviewSlice, actions: reviewSliceActions } = main;
