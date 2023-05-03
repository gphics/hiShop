import React from "react";
import { Link } from "react-router-dom";

type Props = {
  id?: string;
  name?: string;
  productsImageName?: string[];
  price?: number;
  url?: string;
};
// @ts-ignore
function EachProductList({ id, name, productsImageName, price, url="singleproduct" }) {
  const date = new Date().getMilliseconds();

  const imgUrl =
    productsImageName.length > 0
      ? `https://dhkiodtlpiwxnmsbcepb.supabase.co/storage/v1/object/public/product/${productsImageName[0]}?t=${date}`
      : "";
  return (
    <Link to={`/${url}/${id}`} className="each_product_list">
      {imgUrl && <img alt={name} src={imgUrl} className="each_product_img" />}
      <article className="info">
        <p>{name}</p>
        <h5>
          {" "}
          ${price.toString().length < 4 ? price : `${price.toString().slice(0, 2)}..`}{" "}
        </h5>
      </article>
    </Link>
  );
}


export default EachProductList;
