import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { review } from "./utils";
import hiShopSupabase from "../Remote/hiShop";
import { defaultSliceActions } from "./DefaultSlice";
import { toast } from "react-toastify";
const {setIsLoading}  = defaultSliceActions
const initialState: review = {
  main: {creatorName: "", body: "", creatorImgName: "" },
  productReviews: [],

};
// fetching all reviews partaining to a product
export const fetchProductReview = createAsyncThunk("fetchProductReview", async (id: string, thunkAPI: any) => {
  // @ts-ignore

  thunkAPI.dispatch(setIsLoading(true));
  const { data, error } = await hiShopSupabase
    .from("reviews")
    .select()
    .eq("productId", id)
    .single();
  if (error) {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(false));
    return [];
  }
  if (data) {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(false));
    return data;
  }
});

export const createRemoteReview = createAsyncThunk("createRemoteReview", async (_, thunkAPI: any) => {
  // @ts-ignore
  thunkAPI.dispatch(setIsLoading(true))
  const { reviewSlice: { main, productReviews }, userSlice: { user: { firstname, userImgName } } } = thunkAPI.getState()
  const now = new Date()
  const reviewObj = { creatorName: firstname, body: main.body, creatorImgName: userImgName, created_at: now }
  const mainObj = {...productReviews, allReviews:[ reviewObj,...productReviews.allReviews]}

  const { data, error } = await hiShopSupabase.from("reviews")
    .update(mainObj)
    .eq("productId", productReviews.productId)
    .select()
    .single()

  if (data) {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(false));
    return data;
  }
  
  
})
// creating review record when a product is created
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
  reducers: {
    updateReviewBody: (state: any, action: any) => {
      const { name, value } = action.payload
      state.main[name] = value
    },
    setReviewDefault: (state: any) => {
      return {
        main: { creatorName: "", body: "", creatorImgName: "" },
        productReviews: [],
      };
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchProductReview.fulfilled, (state: any, action: any) => {
      state.productReviews = action.payload
    }).addCase(createRemoteReview.fulfilled, (state: any, action: any) => {
      state.productReviews = action.payload
      state.main.body = ""
      toast.success("review added successfully", {position:"top-center", theme:"dark"})
    })
  }
  
});

export const { reducer: reviewSlice, actions: reviewSliceActions } = main;
