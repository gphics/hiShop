import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { product } from "./utils";
import { defaultSliceActions } from "./DefaultSlice";
import { toast } from "react-toastify";
import shortUUID from "short-uuid";
import { instantiateCreateReviews } from "./ReviewSlice";
import automaticCloseModal from "../../Controller/Toggling/automaticCloseModal";
import hiShopSupabase from "../Remote/hiShop";
import { userSliceActions } from "./UserSlice";
const { refillUser } = userSliceActions;
const initialState: product = {
  main: {
    name: "",
    description: "",
    price: "",
    quantity: "",
    productsImageName: [],
    owner: "",
    id: "",
    productOwnerObj: {},
  },
  allProducts: [],
  filterParam: "",
  allProductsCopy: [],
  myProducts: [],
  myProductsCopy: [],
};
const { toggleIsLoading, setIsLoading } = defaultSliceActions;
// fetching my products
export const fetchMyProducts = createAsyncThunk(
  "fetchMyProducts",
  async (_, thunkAPI: any) => {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    const {
      user: { id, purchasedProducts },
    } = thunkAPI.getState().userSlice;
    const bought = purchasedProducts === null ? [] : purchasedProducts;
    const { data, error } = await hiShopSupabase
      .from("product")
      .select()
      .eq("owner", id);
    // @ts-ignore
    if (data === null) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      return [...bought];
    }

    if (data) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      // @ts-ignore
      const main = [...data, ...bought];
      return main;
    }
  }
);

// fetching all products
export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async (_, thunkAPI: any) => {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    const { data, error } = await hiShopSupabase.from("product").select();
    if (data) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      return data;
    }
  }
);

export const fetchSingleProducts = createAsyncThunk(
  "fetchSingleProducts",
  async (id: string, thunkAPI: any) => {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    const { data, error } = await hiShopSupabase
      .from("product")
      .select()
      .eq("id", id)
      .single();

    if (data) {
      const { owner } = data;
      const { data: secondData, error: secondError } = await hiShopSupabase
        .from("user")
        .select()
        .eq("id", owner)
        .single();
      if (secondData) {
        // @ts-ignore
        thunkAPI.dispatch(setIsLoading(false));
        return { ...data, productOwnerObj: secondData };
      }
    }
  }
);
export const fetchMySingleProduct = createAsyncThunk(
  "fetchMySingleProduct",
  async (id: string, thunkAPI: any) => {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    const { data, error } = await hiShopSupabase
      .from("product")
      .select()
      .eq("id", id)
      .single();

    if (data) {
      const { owner } = data;
      const { data: secondData, error: secondError } = await hiShopSupabase
        .from("user")
        .select()
        .eq("id", owner)
        .single();
      if (secondData) {
        // @ts-ignore
        thunkAPI.dispatch(setIsLoading(false));
        return { ...data, productOwnerObj: secondData };
      }
    }
  }
);
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
    const { productOwnerObj, ...rest } = productObj;
    const { data, error } = await hiShopSupabase
      .from("product")
      .insert(rest)
      .select()
      .single();

    if (data) {
      thunkAPI.dispatch(instantiateCreateReviews(productId));
      thunkAPI.dispatch(fetchMyProducts());

      thunkAPI.dispatch(toggleIsLoading());
      return data;
    }
    if (error) {
      return thunkAPI.rejectWithValue("an error occured");
    }
  }
);
// adding to my cart
export const AddToCart = createAsyncThunk(
  "AddToCart",
  async (obj: any, thunkAPI: any) => {
    const { user } = thunkAPI.getState().userSlice;
    const myCart = obj;
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    const { data, error } = await hiShopSupabase
      .from("user")
      .update({ ...user, myCart })
      .eq("id", user.id)
      .select()
      .single();

    if (data) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      // @ts-ignore
      thunkAPI.dispatch(
        refillUser({ user: data, msg: "product added successfully" })
      );
      return data;
    }
  }
);

// removing from cart
export const MainUpdateMyCart = createAsyncThunk(
  " MainUpdateMyCart",
  async (myCart: any, thunkAPI: any) => {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    const { user } = thunkAPI.getState().userSlice;
    const { data, error } = await hiShopSupabase
      .from("user")
      .update({ ...user, myCart })
      .eq("id", user.id)
      .select()
      .single();
    if (data) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      // @ts-ignore
      thunkAPI.dispatch(refillUser({ user: data, msg: "update successful" }));
      return data;
    }
  }
);

export const fetchUpdateProduct = createAsyncThunk(
  "fetchUpdateProduct",
  async (id: string, thunkAPI: any) => {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    const { data, error } = await hiShopSupabase
      .from("product")
      .select()
      .eq("id", id)
      .single();
    if (data) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      return data;
    }
    if (error) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue("an error occured");
    }
  }
);

export const updateProductInfo = createAsyncThunk(
  "updateProductInfo",
  async (_, thunkAPI: any) => {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    const { main } = thunkAPI.getState().productSlice;
    const { data, error } = await hiShopSupabase
      .from("product")
      .update(main)
      .eq("id", main.id)
      .select()
      .single();

    if (data) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      return data;
    }
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(false));
    return thunkAPI.rejectWithValue("an error");
  }
);
export const secondUpdateProductInfo = createAsyncThunk(
  "updateProductInfo",
  async (obj: any, thunkAPI: any) => {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    console.log(obj);
    const { data, error } = await hiShopSupabase
      .from("product")
      .update(obj)
      .eq("id", obj.id)
      .select()
      .single();
    if (data) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      return data;
    }
    if (error) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue("an error");
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
      state[type] = products;
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
      state.filterParam = "";
    },
    setProductDefault: (state) => {
      return {
        main: {
          name: "",
          description: "",
          price: "",
          quantity: "",
          productsImageName: [],
          owner: "",
          id: "",
          productOwnerObj: {},
        },
        allProducts: [],
        filterParam: "",
        allProductsCopy: [],
        myProducts: [],
        myProductsCopy: [],
      };
    },
    setSingleProductMain: (state: any, action: any) => {
      state.main = action.payload;
    },
    clearSingleProductMain: (state: any) => {
      state.main = {
        name: "",
        description: "",
        price: "",
        quantity: "",
        productsImageName: [],
        owner: "",
        id: "",
        productOwnerObj: {},
      };
    },
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
      .addCase(createProductRemote.rejected, (state: any) => {
        toast.error("an error occured", {
          position: "top-center",
        });
      })
      .addCase(fetchMyProducts.fulfilled, (state: any, action: any) => {
        state.myProducts = action?.payload;
        state.myProductsCopy = action.payload;
      })
      .addCase(fetchAllProducts.fulfilled, (state: any, action: any) => {
        state.allProducts = action?.payload;
        state.allProductsCopy = action.payload;
      })
      .addCase(fetchSingleProducts.fulfilled, (state: any, action: any) => {
        state.main = action.payload;
      })
      .addCase(fetchUpdateProduct.fulfilled, (state: any, action: any) => {
        state.main = action.payload;
      })
      .addCase(fetchUpdateProduct.rejected, (state: any, action: any) => {
        toast.warning(action.payload, {
          position: "top-center",
          theme: "dark",
        });
      })
      .addCase(updateProductInfo.fulfilled, (state: any, action: any) => {
        state.main = action.payload;
        toast.success("update successfull", {
          position: "top-center",
          theme: "dark",
        });
      })
      .addCase(updateProductInfo.rejected, (state: any, action: any) => {
        toast.warning(action.payload, {
          position: "top-center",
          theme: "dark",
        });
      }),
});

export const { reducer: productSlice, actions: productSliceActions } = main;
