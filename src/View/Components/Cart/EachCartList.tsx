import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import hiShopSupabase from "../../../Model/Remote/hiShop";
import { useDispatch, useSelector } from "react-redux";
import { MainUpdateMyCart } from "../../../Model/Local/ProductSlice";
type Props = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  productsImageName: string[];
};

function EachCartList({ id, name, quantity, price, productsImageName }: Props) {
  const {
    user: { myCart },
  } = useSelector((state: any) => state.userSlice);
  const dispatch = useDispatch();
  // cart item quantity
  const [quantityState, setQuantityState] = useState(quantity);
  // quantity available from the product owner
  const [mainProductQuantity, setMainProductQuantity] = useState(0);
  // making sure the quantity of the product in the cart doesent exceed that of the total quantity of the product
  async function checkProduct() {
    const { data, error } = await hiShopSupabase
      .from("product")
      .select()
      .eq("id", id)
      .single();
    if (data) {
      const { quantity: fetchedProductQuantity } = data;
      setMainProductQuantity(fetchedProductQuantity);
      if (quantityState <= fetchedProductQuantity) {
        setQuantityState(quantityState);
      } else {
        setQuantityState(fetchedProductQuantity);
      }
    }
  }
  useEffect(() => {
    checkProduct();
  }, []);
  // increasing the product quantity
  function Increase() {
    const ind = myCart.findIndex((item: any) => item.id === id);
    const transformedMyCart = JSON.parse(JSON.stringify(myCart));
    setQuantityState((prev: number) => {
      if (prev === mainProductQuantity) return prev;
      const newQuantity = prev + 1;
      transformedMyCart[ind].quantity = newQuantity;
      return newQuantity;
    });
    // @ts-ignore
    dispatch(MainUpdateMyCart(transformedMyCart));
  }
  // decreasing the product qunatity
  function Decrease() {
    const ind = myCart.findIndex((item: any) => item.id === id);
    const transformedMyCart = JSON.parse(JSON.stringify(myCart));
    setQuantityState((prev: number) => {
      if (prev === 1) {
        RemoveProduct();
        return prev;
      }
      const newQuantity = prev - 1;
      transformedMyCart[ind].quantity = newQuantity;
      return newQuantity;
    });
    // @ts-ignore
    dispatch(MainUpdateMyCart(transformedMyCart));
  }
  // removing the product
  function RemoveProduct() {
    const rest = myCart.filter((item: any) => item.id !== id);
    // @ts-ignore
    dispatch(MainUpdateMyCart(rest));
  }

  const imgUrl: string = `https://dhkiodtlpiwxnmsbcepb.supabase.co/storage/v1/object/public/product/${productsImageName[0]}`;
  return (
    <article className="each_cart_list">
      <Link className="cart_item_link" to={`/singleproduct/${id}`}>
        <img src={imgUrl} alt={name} />
        <h4> {name.length > 12 ? `${name.slice(0, 12)}...` : name} </h4>
      </Link>

      <div className="cart_item_rest_info">
        <div className="control_holder">
          <button className="decrease_btn" onClick={Decrease} type="button">
            -
          </button>
          <h5> {quantityState} </h5>
          <button className="increase_btn" onClick={Increase} type="button">
            +
          </button>
        </div>
        <h4> ${price * quantityState} </h4>
        <button onClick={RemoveProduct} type="button" className="remove_btn">
          x
        </button>
      </div>
    </article>
  );
}

export default EachCartList;
