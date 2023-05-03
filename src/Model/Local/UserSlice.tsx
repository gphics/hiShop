import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { user } from "./utils";
import { defaultSliceActions } from "./DefaultSlice";
import { toast } from "react-toastify";
import shortUUID from "short-uuid";
import hiShopSupabase from "../Remote/hiShop";
import sessionStorageFunctions from "../../Controller/sessionStorageFunctions";

//
const { toggleIsLoading, setIsLoading } = defaultSliceActions;
const { SetItem, DeleteItem } = sessionStorageFunctions;

// user registration
export const RegisterUser = createAsyncThunk(
  "registerUser",
  async (_, thunkAPI: any) => {
    const { user } = thunkAPI.getState().userSlice;
    const { data, error } = await hiShopSupabase
      .from("user")
      .insert({ ...user, id: shortUUID.generate() })
      .select()
      .single();

    if (data) {
      thunkAPI.dispatch(toggleIsLoading());
      return data;
    }
  }
);
// user login
export const LoginUser = createAsyncThunk(
  "loginUser",
  async (_, thunkAPI: any) => {
    thunkAPI.dispatch(toggleIsLoading());
    const { login } = thunkAPI.getState().userSlice;

    const { data, error } = await hiShopSupabase
      .from("user")
      .select()
      .eq("email", login?.email)
      .single();
    if (data) {
      thunkAPI.dispatch(toggleIsLoading());
      if (data.password === login?.password) return data;
      return thunkAPI.rejectWithValue("incorrect password");
    }

    thunkAPI.dispatch(toggleIsLoading());
    return thunkAPI.rejectWithValue("an errror occur during login");
  }
);
// updating user
export const UserProfileUpdate = createAsyncThunk(
  "UserProfileUpdate",
  async (_, thunkAPI: any) => {
    const { user } = thunkAPI.getState().userSlice;
    const { data, error } = await hiShopSupabase
      .from("user")
      .update(user)
      .eq("email", user.email)
      .select()
      .single();
    if (data) {
      thunkAPI.dispatch(toggleIsLoading());
      return data;
    }
  }
);

// @ts-ignore
const storedData = JSON.parse(sessionStorage.getItem("hiShopUser"));
const initialState: user = {
  isAuthenticated: storedData?.isAuthenticated || false,
  user: storedData?.user || {
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    contact: "",
    shopName: "",
    hiPayAccount: "",
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
  reducers: {
    updateUser: (state: any, action: any): void => {
      const { type, name, value } = action.payload;
      state[type][name] = value;
    },
    logOutUser: (state) => {
      DeleteItem("hiShopUser");
      return {
        isAuthenticated: false,
        user: {
          firstname: "",
          lastname: "",
          password: "",
          email: "",
          contact: "",
          shopName: "",
          hiPayAccount: "",
          location: "",
          userImgName: "",
        },
        login: {
          email: "",
          password: "",
        },
      };
    },
    refillUser: (state: any, action: any) => {
      const { msg, user } = action.payload;
      state.user = user;
      SetItem("hiShopUser", { user, isAuthenticated: true });
      toast.success(msg, {
        position: "top-center",
      });
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(RegisterUser.fulfilled, (state: any, action: any) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        SetItem("hiShopUser", { user: action.payload, isAuthenticated: true });
        toast.success("account created succeefully", {
          position: "top-center",
        });
      })
      .addCase(LoginUser.fulfilled, (state: any, action: any) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        SetItem("hiShopUser", { user: action.payload, isAuthenticated: true });
        toast.success("login confirmed !", {
          position: "top-center",
        });
      })
      .addCase(LoginUser.rejected, (state: any, action: any) => {
        toast.error(action?.payload, {
          position: "top-center",
        });
      })
      .addCase(UserProfileUpdate.fulfilled, (state: any, action: any) => {
        state.user = action.payload;
        SetItem("hiShopUser", { user: action.payload, isAuthenticated: true });
        toast.success("update successful", {
          position: "top-center",
        });
      }),
});

export const { reducer: userSlice, actions: userSliceActions } = main;
