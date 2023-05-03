import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProducts } from "../../../Model/Local/ProductSlice";
import myProductsComponents from "../../Components/MyProducts";
import BarHolder from "../../Components/Navigation/BarHolder";
import { AddToCart } from "../../../Model/Local/ProductSlice";
import { productSliceActions } from "../../../Model/Local/ProductSlice";
import ReviewsComponent from "../../Components/MyProducts/Reviews";
function SingleMyProduct() {
  function Increase(e: any): void {
    setQuantityState((prev) => (prev < quantity ? prev + 1 : prev));
  }
  function Decrease(e: any): void {
    setQuantityState((prev) => (prev !== 1 ? prev - 1 : prev));
  }
  const { setSingleProductMain } = productSliceActions;
  const [infoShow, setInfoShow] = useState(0);
  const [purchasedState, setPurchasedState] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { Gallery, ProductsInfo, SellerInfo } = myProductsComponents;
  const {
    productSlice: { main },
    userSlice: {
      user: { id: userId, myCart, purchasedProducts },
    },
  } = useSelector((state: any) => state);
  const {
    id: productId,
    name,
    owner,
    description,
    price,
    quantity,
    productsImageName,
    created_at
  } = main;

  const [quantityState, setQuantityState] = useState(1);
  function productToCart() {
    // if the cart is empty
    if (myCart !== null && myCart.length === 0) {
      //  @ts-ignore
      dispatch(AddToCart([{ ...main, quantity: quantityState }]));
      return;
    }
    // if the cart is not empty
    // if the item is already in the cart, then I update the cart
    const check = myCart.filter((item: any) => item.id === productId);
    if (check.length > 0) {
      const obj = { ...main, quantity: quantityState };
      const myCartFilter = myCart.filter((item: any) => item.id !== productId);
      // @ts-ignore
      dispatch(AddToCart([...myCartFilter, { ...obj }]));
      return;
    }
    // if the item is not in the cart
    const obj = { ...main, quantity: quantityState };
    // @ts-ignore
    dispatch(AddToCart([...myCart, obj]));
  }
  // fetching the product
  useEffect(() => {
    if (purchasedProducts && purchasedProducts.length !== 0) {
      const obj = purchasedProducts.filter((item: any) => item.id === id);
      if (obj.length !== 0) {
      
        dispatch(setSingleProductMain(obj[0]));
        setPurchasedState(true);
        return;
      }
    }
    // @ts-ignore
    dispatch(fetchSingleProducts(id));
  }, []);
 
  // for updating the quantity if the product already exist in the cart
  useEffect(() => {
    // setting the quantity to default
    setQuantityState(1);
    // updating the quantity since i bought the product already
    if (purchasedState) {
      setQuantityState(quantity);
    }
    // updating the quantity since the product already exist in the cart

    if (myCart !== null && myCart.length !== 0) {
      const check = myCart.filter((item: any) => item.id === productId);
      if (check.length !== 0) {
        const { quantity: filteredQuantity } = check[0];
        const realQuantity =
          filteredQuantity <= quantity ? filteredQuantity : quantity;
        setQuantityState(realQuantity);
      }
    }
  }, [main, purchasedState]);
  const productObj = {
    Increase,
    productToCart,
    Decrease,
    quantity,
    quantityState,
    name,
    userId,
    owner,
    description,
    price,
    productsImageName,
    created_at,
    purchasedState,
    id:productId
  };
 
  if (!name) return <h5></h5>;
  return (
    <div className="single_product">
      <BarHolder />
      <main>
        {productsImageName.length > 0 && (
          <section className="gallery_holder">
            <Gallery img={productsImageName} />
          </section>
        )}
        <section className="main_holder">
          <section className="info_show">
            <button
              type="button"
              onClick={(e) => setInfoShow(0)}
              className={infoShow === 0 ? "btn active" : "btn"}
            >
              product info
            </button>
            <button
              onClick={(e) => setInfoShow(1)}
              type="button"
              className={infoShow === 1 ? "btn active" : "btn"}
            >
              seller info
            </button>
            <button
              onClick={(e) => setInfoShow(2)}
              type="button"
              className={infoShow === 2 ? "btn active" : "btn"}
            >
              Reviews
            </button>
          </section>
          {infoShow === 1 && <SellerInfo id={owner} />}
          {infoShow === 0 && <ProductsInfo {...productObj} />}
          {infoShow === 2 && <ReviewsComponent name={name} id={productId} />}
        </section>
      </main>
    </div>
  );
}

export default SingleMyProduct;
