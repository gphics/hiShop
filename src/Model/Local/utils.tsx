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
  };
  purchasedProducts: [];
  myCart: [];
}
export type eachReview = {
  img: string;
  id: string;
  creatorName: string;
  body: string;
  creatorImgName: string;
  created_at?: string;
};
export interface review {
  productId: string;
  main: eachReview;
  allReviews: eachReview[];
  created_at?: string;
}

export interface transaction {
  productId: string;
  seller: string;
  buyer: string;
  price: number | string;
  quantity: number | string;
  id: string;
  created_at?: string;
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
};
export interface product {
  main: eachProduct;
  allProducts: eachProduct[];
  allProductsCopy: eachProduct[];
  myProducts: eachProduct[];
  myProductsCopy: eachProduct[];
  filterParam: string;
}
