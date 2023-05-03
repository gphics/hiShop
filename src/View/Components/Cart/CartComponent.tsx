import { useSelector } from "react-redux"
import BarHolder from "../Navigation/BarHolder"
import {useState, useEffect} from 'react'
import EachCartList from "./EachCartList"

import MainCartCheckout from "./MainCartCheckout"
const CartComponent = () => {
  const { user: { myCart } } = useSelector((state: any) => state.userSlice)
  const [totalPrice, setTotalPrice] = useState(0)
  const [showCartCheckout, setShowCheckOut] = useState(false)
  function calculateTotalPrice(): void {
    if (!myCart || myCart.length === 0) return;
    const arr = JSON.parse(JSON.stringify(myCart))
    // const main: number = arr.reduce((prev: any, cur: any) => {
    //   prev += cur.price * cur.quantity
    //   return prev
    // }, 0)
    // console.log(main)
    setTotalPrice(
      arr.reduce((prev: any, cur: any) => {
       prev += cur.price * cur.quantity;
       return prev;
      }, 0)
    );
  }
  useEffect(() => {
    calculateTotalPrice()
  }, [myCart])
 
  function toggleShowCheckOut() {
    setShowCheckOut((prev:boolean)=> !prev)
  }
  return (
    <div className="cart_component">
      <BarHolder />
   
      <main>
        {myCart === null || myCart.length === 0 ? (
          <h3 className="empty_cart_notice">Your Cart Is Empty</h3>
        ) : (
          <>
            <section className="cart_listing">
              <section className="listing">
                {myCart.map((item: any, index: number) => (
                  <EachCartList {...item} key={index * 4645} />
                ))}
              </section>
              <section className="cart_total_price">
                <hr />
                <h4>
                  total price: <span>${totalPrice} </span>{" "}
                  </h4>
                  <div>
                    <button onClick={toggleShowCheckOut} className="btn" type="button">checkout</button>
                  </div>
              </section>
            </section>
              {showCartCheckout &&
                <MainCartCheckout clearCart={true} allProducts={myCart} toggleShow={toggleShowCheckOut} totalPrice={totalPrice} />
              }
          </>
        )}
      </main>
    </div>
  );
}

export default CartComponent;