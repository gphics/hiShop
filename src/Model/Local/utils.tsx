export interface user {
  isAuthenticated: boolean;
  user: {
    shopName: string;
    firstname: string;
    lastname: string;
    contact: number | string;
    email: string;
    password: string;
    userImgName: string;
    location: string;
    hiPayAccount: string;
    created_at?: string;
  };
  login: {
    email: string;
    password: string;
  }
}
export type eachReview = {
  creatorName: string;
  body: string;
  creatorImgName: string;
  created_at?: string;
};
export interface review {
  main: eachReview;
  productReviews: eachReview[];
  created_at?: string;
}

export interface transaction {
  main: {
    id: string;
    info: {}[];
    buyer: string;
    created_at?: string;
    totalPrice: number;
    totalQuantity: number;
    remarks: string;
    productsImageName:string[];
  };
  myTransactions: [];
}

export type eachProduct = {
  name: string;
  description: string;
  price: number | string;
  quantity: number | string;
  productsImageName: string[];
  owner: string;
  id: string;
  created_at?: string;
  productOwnerObj: {};
};
export interface product {
  main: eachProduct;
  allProducts: eachProduct[];
  allProductsCopy: eachProduct[];
  myProducts: eachProduct[];
  myProductsCopy: eachProduct[];
  filterParam: string;
}
