import { useState } from "react";
import MainCartCheckout from "../Cart/MainCartCheckout";
import { useNavigate } from "react-router-dom";
import { productSliceActions } from "../../../Model/Local/ProductSlice";
import { useDispatch } from "react-redux";
type Props = {
  name: string;
  quantity: number;
  description: string;
  userId: string;
  owner: string;
  Decrease: any;
  quantityState: number;
  Increase: any;
  productToCart: any;
  created_at: string;
  price: number;
  purchasedState?: boolean;
  id: string;
  productsImageName:string[]
};

function ProductsInfo({
  price,
  quantity,
  description,
  created_at,
  quantityState,
  Decrease,
  userId,
  owner,
  productToCart,
  Increase,
  name,
  purchasedState = false,
  id,
  productsImageName,
}: Props) {
  const [show, setShow] = useState(false);
  function toggleShow() {
    setShow((prev: boolean) => !prev);
  }
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const allProducts: {}[] = [
    { owner, id, name, quantity: quantityState, price ,  description, productsImageName},
  ];
  const totalPrice = price * quantityState;
  const obj = { allProducts, toggleShow, totalPrice, clearCart: false };
  const transformedPrice: string = "$" + price;
  const {clearSingleProductMain} = productSliceActions
  function updateBtnClick() {
    dispatch(clearSingleProductMain())
    Navigate(`/productupdate/${id}`)
  }
  return (
    <article className="single_product_info">
      <header>
        <h3> {name} </h3>
        <h5>price: {transformedPrice}</h5>
        <h5 style={{ textTransform: "capitalize" }}>
          {" "}
          Quantity {!purchasedState ? "Available" : "Purchased"}:{" "}
          {quantity !== 0 ? quantity : "Not Available"}{" "}
        </h5>
        {!purchasedState && (
          <h5>added on {new Date(created_at).toDateString()}</h5>
        )}
      </header>
      <article className="single_product_article">
        <h4>Description</h4>
        <p> {description} </p>
      </article>
  
        <footer>
        {purchasedState === false && owner !== userId &&
          <aside>
            <div className="quantity_control">
              <h5>quantity</h5>

              <section>
                <button type="button" onClick={Decrease}>
                  -
                </button>
                <h4> {quantityState} </h4>
                <button type="button" onClick={Increase}>
                  {" "}
                  +
                </button>
              </section>
            </div>
            <div className="price_display">
              <h5>total price : ${price * quantityState} </h5>
            </div>
          </aside>
        
        }
        
        <div className="btn_holder">
          {owner === userId &&
            <button type="button" onClick={updateBtnClick}> update </button>
          }
          {quantity !== 0 && owner !== userId && !purchasedState &&
            <>
              {" "}
              <button type="button" onClick={toggleShow}>
                {" "}
                buy now
              </button>
              <button type="button" onClick={productToCart}>
                add to cart
              </button>
            </>
          }
       
             </div>
   
        </footer>
    
      {show && <MainCartCheckout {...obj} />}
    </article>
  );
}

export default ProductsInfo;
