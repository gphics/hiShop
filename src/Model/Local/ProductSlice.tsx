import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { product } from "./utils";
import { defaultSliceActions } from "./DefaultSlice";
import { toast } from "react-toastify";
import shortUUID from "short-uuid";
import { instantiateCreateReviews } from "./ReviewSlice";
import automaticCloseModal from "../../Controller/Toggling/automaticCloseModal";
import hiShopSupabase from "../Remote/hiShop";
const initialState: product = {
  main: {
    name: "",
    description: "",
    price: "",
    quantity: "",
    productsImageName: [],
    owner: "",
    id: "",
  },
  allProducts: [],
  filterParam: "",
  allProductsCopy: [],
  myProducts: [],
  myProductsCopy: [],
};
const { toggleIsLoading , setIsLoading} = defaultSliceActions;

// fetching my products
export const fetchMyProducts = createAsyncThunk(
  "fetchMyProducts",
  async (_, thunkAPI: any) => {
    const {
      user: { id },
    } = thunkAPI.getState().userSlice;
    const { data, error } = await hiShopSupabase
      .from("product")
      .select()
      .eq("owner", id);
    // @ts-ignore
    console.log(data, error)
    if (data?.length === 0 && !error) return [];
    return data;
  }
);

// fetching all products
export const fetchAllProducts = createAsyncThunk("fetchAllProducts", async (_, thunkAPI: any) => {
  // @ts-ignore
  thunkAPI.dispatch(setIsLoading(true))
  const { data, error } = await hiShopSupabase.from("product")
    .select()
  if (data) {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(false));
    return data
  }
}) 
export const fetchSingleProducts = createAsyncThunk("fetchSingleProducts", async (id: string, thunkAPI: any) => {
  // @ts-ignore
  thunkAPI.dispatch(setIsLoading(true))
  const { data, error } = await hiShopSupabase.from("product")
    .select()
    .eq("id", id)
    .single()
  console.log(data, error)
  if (data) {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(false))
    return data;
  } 
})
// product creation

export const createProductRemote = createAsyncThunk(
  "createProductRemote",
  async (_, thunkAPI: any) => {
    const {
      productSlice: { main },
      userSlice: {
        user: { id },
      },
    } = thunkAPI.getState();
    const productId: string = shortUUID.generate();
    const productObj = { ...main, owner: id, id: productId };
    const { data, error } = await hiShopSupabase
      .from("product")
      .insert(productObj)
      .select()
      .single();
    if (data) {
      thunkAPI.dispatch(instantiateCreateReviews(productId));
      thunkAPI.dispatch(fetchMyProducts());
      automaticCloseModal();
      thunkAPI.dispatch(toggleIsLoading());
      return data;
    }
  }
);

const main = createSlice({
  name: "productSlice", 
  initialState,
  reducers: {
    filterProduct: (state: any, action: any) => {
      const { name, value, type, products } = action.payload;
      state[name] = value;
      state[type] = products
    },
    updateProductMain: (state: any, action: any) => {
      const { name, value } = action.payload;
      if (name === "price" || name === "quantity") {
        state.main[name] = +value;
        return;
      }
      state.main[name] = value;
    },
    updateProductImagesName: (state: any, action: any) => {
      state.main.productsImageName.push(action.payload);
    },
    setFilterDefault: (state: any) => {
      state.filterParam = ""
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(createProductRemote.fulfilled, (state: any) => {
        state.main = {
          name: "",
          description: "",
          price: "",
          quantity: "",
          productsImageName: [],
          owner: "",
          id: "",
        };
        toast.success("product created successfully", {
          position: "top-center",
        });
      })
      .addCase(fetchMyProducts.fulfilled, (state: any, action: any) => {
        state.myProducts = action?.payload;
        state.myProductsCopy = action.payload
      }).addCase(fetchAllProducts.fulfilled, (state: any, action: any) => {
        state.allProducts = action?.payload
        state.allProductsCopy = action.payload
      }).addCase(fetchSingleProducts.fulfilled, (state: any, action: any) => {
        state.main = action.payload
      }),
});

export const { reducer: productSlice, actions: productSliceActions } = main;
