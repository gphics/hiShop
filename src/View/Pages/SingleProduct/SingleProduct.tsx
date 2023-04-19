import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProducts } from "../../../Model/Local/ProductSlice";
import myProductsComponents from "../../Components/MyProducts";
import BarHolder from "../../Components/Navigation/BarHolder";
function SingleProduct() {
  const [quantityState, setQuantityState] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { Gallery } = myProductsComponents;
  const {
    productSlice: { main },
    userSlice: {
      user: { id: userId },
    },
  } = useSelector((state: any) => state);
  const {
    name,
    owner,
    description,
    price,
    quantity,
    productsImageName,
    created_at,
  } = main;
  function Increase(e: any): void {
    setQuantityState((prev) => (prev < quantity ? prev + 1 : prev));
  }
  function Decrease(e: any): void {
    setQuantityState((prev) => (prev !== 1 ? prev - 1 : prev));
  }
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchSingleProducts(id));
  }, []);
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
        <article className="single_product_info">
          <header>
            <h3> {name} </h3>
            <h5>price: ${price}</h5>
            <h5> quantity available: {quantity} </h5>
            <h5>added on {new Date(created_at).toDateString()}</h5>
          </header>
          <article>
            <p> {description}</p>
          </article>

          <footer>
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
            <div className="btn_holder">
              {owner === userId && <button type="button"> update </button>}
              {owner !== userId && <button type="button"> buy now</button>}
              <button type="button">add to cart</button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}

export default SingleProduct;
