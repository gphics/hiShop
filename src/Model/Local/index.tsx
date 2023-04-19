import { transactionSlice } from "./TransactionSlice";
import { reviewSlice } from "./ReviewSlice";
import { productSlice } from "./ProductSlice";
import { userSlice } from "./UserSlice";
import { defaultSlice } from "./DefaultSlice";
const localModel: {} = {
  transactionSlice,
  userSlice,
  productSlice,
  reviewSlice,
  defaultSlice
};

export default localModel;
