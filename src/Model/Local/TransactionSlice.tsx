import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transaction } from "./utils";
import hiShopSupabase from "../Remote/hiShop";
import { userSliceActions } from "./UserSlice";
import { defaultSliceActions } from "./DefaultSlice";
import hiPaySupabase from "../Remote/hiPay";
import shortUUID from "short-uuid";
import { toast } from "react-toastify";
const { refillUser } = userSliceActions;
const { toggleIsLoading, setIsLoading } = defaultSliceActions;
const initialState: transaction = {
  main: {
    id: "",
    info: [],
    buyer: "",
    totalPrice: 0,
    totalQuantity: 0,
    remarks: "",
    productsImageName: [],
  },
  myTransactions: [],
};
////////////////////
/////////////
// making payment and update product quantity
const CompleteTransaction = createAsyncThunk(
  "CompleteTransaction",
  async (obj: any, thunkAPI: any) => {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    const { user } = thunkAPI.getState().userSlice;
    const id = shortUUID.generate();
    const { price, quantity, owner, name, productId } = obj;
    // fetching product owner info and the product info
    const fetchingRequiredInfo = await Promise.allSettled([
      await hiShopSupabase.from("user").select().eq("id", owner).single(),
      await hiShopSupabase
        .from("product")
        .select()
        .eq("id", productId)
        .single(),
    ]);
    if (fetchingRequiredInfo) {
      const [first, second]: [first: any, second: any] = fetchingRequiredInfo;
      const ownerInfo = first.value.data;
      const productInfo = second.value.data;
      const {
        hiPayAccount: sellerHiPayAccountNumber,
        shopName: sellerShopName,
      } = ownerInfo;
      const { hiPayAccount: buyerHiPayAccountNumber } = user;
      // fetching both seller and buyer hiPayAccount account details
      const fetchingPaymentAccountInfo = await Promise.allSettled([
        await hiPaySupabase
          .from("user")
          .select()
          .eq("accountNumber", buyerHiPayAccountNumber)
          .single(),

        await hiPaySupabase
          .from("user")
          .select()
          .eq("accountNumber", sellerHiPayAccountNumber)
          .single(),
      ]);
      if (fetchingPaymentAccountInfo) {
        const [third, fourth]: [third: any, foutth: any] =
          fetchingPaymentAccountInfo;
        const buyerAccountInfo = third.value.data;
        const sellerAccountInfo = fourth.value.data;
        const transactionObj = {
          id: shortUUID.generate(),
          receiver: sellerHiPayAccountNumber,
          sender: buyerHiPayAccountNumber,
          amount: price,
          remarks: `payment for ${quantity} ${name} from ${sellerShopName} shop on hiShop`,
        };
        const finalProcess = await Promise.allSettled([
          await hiPaySupabase
            .from("user")
            .update({
              ...buyerAccountInfo,
              accountBalance: buyerAccountInfo.accountBalance - price,
            })
            .eq("accountNumber", buyerHiPayAccountNumber)
            .select()
            .single(),
          await hiPaySupabase
            .from("user")
            .update({
              ...sellerAccountInfo,
              accountBalance: sellerAccountInfo.accountBalance + price,
            })
            .eq("accountNumber", sellerHiPayAccountNumber)
            .select()
            .single(),
          await hiPaySupabase
            .from("transaction")
            .insert(transactionObj)
            .select()
            .single(),
          await hiShopSupabase
            .from("product")
            .update({
              ...productInfo,
              quantity: productInfo.quantity - quantity,
            })
            .eq("id", productId)
            .select()
            .single(),
        ]);

        if (finalProcess) {
          // @ts-ignore
          thunkAPI.dispatch(setIsLoading(false));
        }
      }
    }
  }
);
// reduce product quantity

// make transaction
export const MakeTransaction = createAsyncThunk(
  "MakeTransaction",
  async (obj: any, thunkAPI: any) => {
    const { user } = thunkAPI.getState().userSlice;
    const { transaction, purchasedProducts, clearCart } = obj;
    const { info } = transaction;
    const transformedCart = clearCart ? [] : user.myCart;
    // clearing my cart and adding my newly purchased products
    // @ts-ignore
    thunkAPI.dispatch(toggleIsLoading());
    const { data: firstData, error: firstError } = await hiShopSupabase
      .from("user")
      .update({ ...user, purchasedProducts, myCart: transformedCart })
      .eq("id", user.id)
      .select()
      .single();

    if (firstData) {
      const { productsImageName, ...rest } = transaction;
      // creatin the transaction remotely
      const { data: secondData, error: secondError } = await hiShopSupabase
        .from("transaction")
        .insert(rest)
        .select()
        .single();
      if (secondData) {
        info.map((item: any) => {
          //  @ts-igore
          thunkAPI.dispatch(CompleteTransaction(item));
        });
        // @ts-ignore
        thunkAPI.dispatch(
          refillUser({ user: firstData, msg: "product acquired successfully" })
        );
        return secondData;
      }
    }
    if (firstError) {
      return thunkAPI.rejectWithValue("an error occured");
    }
  }
);
// fetch my transactions
export const fetchMyTranactions = createAsyncThunk(
  "fetchMyTransactions",
  async (_, thunkAPI: any) => {
    // @ts-ignore
    thunkAPI.dispatch(setIsLoading(true));
    const { id } = thunkAPI.getState().userSlice.user;
    const { data, error } = await hiShopSupabase
      .from("transaction")
      .select()
      .eq("buyer", id);

    if (data) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      return data;
    }
    if (error) {
      // @ts-ignore
      thunkAPI.dispatch(setIsLoading(false));
      return thunkAPI.rejectWithValue("kindly refresh");
    }
  }
);

const main = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    updateTransaction: (state: any, action: any) => {
      console.log(action.payload);
      state.main = { ...state.main, ...action.payload };
    },
    setTransactionDefault: (state: any) => {
      return {
        ...state,
        main: {
          id: "",
          info: [],
          buyer: "",
          totalPrice: 0,
          totalQuantity: 0,
          remarks: "",
          productsImageName: [],
        },
        myTransactions: [],
      };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(MakeTransaction.rejected, (state: any, action: any) => {
        toast.error(action.payload, { position: "top-center" });
      })
      .addCase(fetchMyTranactions.fulfilled, (state: any, action: any) => {
        state.myTransactions = action.payload;
      })
      .addCase(fetchMyTranactions.rejected, (state: any, action: any) => {
        toast.error(action.payload, { position: "top-center" });
      });
  },
});

export const { reducer: transactionSlice, actions: transactionSliceActions } =
  main;
