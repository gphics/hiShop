import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import hiPaySupabase from "../../../Model/Remote/hiPay";
import { toast } from "react-toastify";
import HiPayLogo from "../../../assets/Static/SVG/hiPay.svg";
import {
  MakeTransaction,
  transactionSliceActions,
} from "../../../Model/Local/TransactionSlice";
import shortUUID from "short-uuid";

type Props = { totalPrice: number; toggleShow: any; allProducts: any, clearCart:boolean };

const MainCartCheckout = ({ totalPrice, toggleShow, allProducts , clearCart}: Props) => {
  const {
    userSlice: { user },
    transactionSlice: { main: checkoutInfo },
  } = useSelector((state: any) => state);
  const [accountDetails, setAccountDetails] = useState(null);
  const [totQuantity, setTotQuantity] = useState(0);
  const [pin, setPin] = useState("");
  const { updateTransaction } = transactionSliceActions;
  const [incorrectPinNotification, setIncorrectPinNotification] = useState("");
  const dispatch = useDispatch();
  const { purchasedProducts } = user;
  //   fetching hiPay account details
  async function fetchHiPayAccount() {
    const { data, error } = await hiPaySupabase
      .from("user")
      .select()
      .eq("accountNumber", user.hiPayAccount)
      .single();
    if (data) {
      //   @ts-ignore
      setAccountDetails(data);
      return;
    }
    toast.warning("your hipay account doesent exist, kindly update your info", {
      position: "top-center",
    });
    return;
  }
  useEffect(() => {
    fetchHiPayAccount();
  }, []);

  // creating transaction details
  function createTransactionDetails() {
    const arr = JSON.parse(JSON.stringify(allProducts));
    let totalQuantity: number = 0;
    const info: {
      productsImageName: [];
      productId: string;
      owner: string;
      name: string;
      quantity: number;
      price: number;
      description:string;
    }[] = [];
    arr.forEach((item: any) => {
      totalQuantity += item.quantity;
      info.push({
        name: item.name,
        quantity: item.quantity,
        price: item.price * item.quantity,
        owner: item.owner,
        productId: item.id,
        productsImageName: item.productsImageName,
        description: item.description
      });
    });
    const remarks = `purchase of ${totalQuantity} goods for ${
      "$" + totalPrice
    } on hiShop from ${user.shopName} shop`;
    setTotQuantity(totalQuantity);
    const obj = { totalPrice, totalQuantity, info, remarks };
    // @ts-ignore
    dispatch(updateTransaction(obj));
  }
  useEffect(() => {
    if (allProducts.length === 0) return;
    createTransactionDetails();
  }, []);
  // direct click toggle function on the overlay
  function checkoutOverlayToggle(e: any) {
    const elem = document.querySelector(".main_cart_checkout");
    if (e.target === elem) {
      toggleShow();
    }
  }

  function checkoutFunction(e: any) {
    e.preventDefault();

    // in case the transaction pin is not correct
    // @ts-ignore
    if (pin !== accountDetails.transactionPin) {
      setIncorrectPinNotification("Incorrect Pin");
      setTimeout(() => {
        setIncorrectPinNotification("");
      }, 7000);
      return;
    }
    // checking if the total price is greater than the account balance of the user
    // @ts-ignore
    if (totalPrice > accountDetails.accountBalance) {
      setIncorrectPinNotification("Insufficient Balance");
      setTimeout(() => {
        setIncorrectPinNotification("");
      }, 7000);
      return;
    }
    // the cart item
    const firstProcess = JSON.parse(JSON.stringify(allProducts));
    const id: string = shortUUID.generate();
    const buyer: string = user.id;
    // adding the buyer's id and turing the price from each product price to total price
    const processedProducts = firstProcess.map((item: any) => {
      return { ...item, buyer, price:item.price * item.quantity };
    });
    // filling all empty fields in the checkout info
    const transactionObj = { ...checkoutInfo, id, buyer };

    if (purchasedProducts === null || purchasedProducts.length === 0) {
      // @ts-ignore
      dispatch(  MakeTransaction({
          transaction: transactionObj,
        purchasedProducts: processedProducts,
          clearCart
        })
      );
      setTimeout(() => {
        toggleShow();
      }, 2000);
      return;
    }

    // my previously purchaseed product
    // reParsing my purchased product array so as to prevent unnecessary problem
    const secondProcess = JSON.parse(JSON.stringify(purchasedProducts));
    // checking and updating in case I have bought the product in the past
    const final = secondProcess.map((item: any) => {
      processedProducts.forEach((elem: any) => {
        if (item.id === elem.id) {
          item.quantity += elem.quantity;
          item.price += elem.price;
        }
      });
      return item;
    });
    console.log("I am the final", final)
    // if I havent bought the product in the past , then I add it to the purchased Product arr
    const lastCheck = processedProducts.forEach((item: any) => {
      const first = final.filter((elem: any) => elem.id === item.id);
      if (first.length === 0) {
        final.push(item);
      }
    });

    // @ts-ignore
    dispatch(MakeTransaction({
        transaction: transactionObj,
        purchasedProducts: final,
        clearCart
      })
    );
    setTimeout(() => {
      toggleShow();
    }, 2000);

    return;
  }
  return (
    <div onClick={checkoutOverlayToggle} className="main_cart_checkout">
      <main className="checkout_container">
        {accountDetails ? (
          <section className="checkout_card_details">
            <header>
              <h3>card details</h3>
            </header>

            {accountDetails && (
              <article className="card">
                <div className="part_a">
                  <h4>HiPay</h4>
                  <img src={HiPayLogo} alt="logo" />
                </div>

                <div className="part_b">
                  {/* @ts-ignore */}
                  <h5> {accountDetails.accountNumber} </h5>

                  <h6>
                    {/* @ts-ignore */}
                    {accountDetails?.firstname} {accountDetails?.lastname}
                  </h6>
                </div>
              </article>
            )}
          </section>
        ) : (
          <h3 className="card_details_loading_notification">
            fetching account details ...
          </h3>
        )}
        <article id="checkout_product_info">
          <header>
            <h3>checkout Informations</h3>
          </header>

          <div className="item_list">
            <hr />
            <div key="a97d" className="list_info">
              <h6 className="name_holder"> Name</h6>
              <h6> Quantity </h6>
              <h6> Price($) </h6>
            </div>
            <hr />
            {checkoutInfo.info.map((item: any, index: number) => {
              return (
                <div className="list_info" key={index}>
                  <h6 className="name_holder">
                    {" "}
                    {item.length < 40 ? item.name : item.name.slice(0, 41)}{" "}
                  </h6>
                  <h6> {item.quantity} </h6>
                  <h6> {item.price} </h6>
                </div>
              );
            })}
            <hr />
            <div key="a9" className="list_info">
              <h5 className="name_holder"> totals</h5>
              <h5> {totQuantity} </h5>
              <h5> ${totalPrice} </h5>
            </div>
            <hr />
          </div>
        </article>
        <form onSubmit={checkoutFunction} className="product_checkout_form">
          <header>
            <h3>Payment</h3>
          </header>

          <section className="form_info">
            <label
              htmlFor="pin"
              className={incorrectPinNotification && "incorrectPin"}
            >
              {" "}
              {incorrectPinNotification || "Transaction Pin"}
            </label>
            <input
              type="number"
              title="pin"
              name="pin"
              value={pin}
              placeholder="your pin ..."
              onChange={(e) => setPin(e.target.value)}
            />
            <button onClick={checkoutFunction} type="submit">
              checkout
            </button>
          </section>
        </form>
      </main>
    </div>
  );
};
export default MainCartCheckout;
