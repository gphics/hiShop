import React from "react";

type Props = {
  created_at: string;
  info: [];
  remarks: string;
  totalPrice: number;
  totalQuantity: number;
};

const EachTransaction = ({
  created_at,
  info,
  remarks,
  totalPrice,
  totalQuantity,
}: Props) => {
  return (
    <div className="each_transaction">
      <header>
        <h4 className="section_name"> Info</h4>
        <h5> Date: {new Date(created_at).toDateString()} </h5>
        <h5> quantity: {totalQuantity} </h5>
        <h5> price: ${totalPrice} </h5>
      </header>

      <h4 className="section_name"> purchased products</h4>
      {/* purchased products */}
      <div className="purchased_products">
        <div className="each" key="name90">
          <h6 className="each_name first">Name</h6>
          <h6 className="others first">Quantity</h6>
          <h6 className="others first">Price</h6>
          <h6 className="others first">Seller</h6>
        </div>
        {info &&
          info.map((item: any, index: number) => (
            <div className="each" key={index}>
              <h6 className="each_name"> {item.name} </h6>
              <h6 className="others"> {item.quantity} </h6>
              <h6 className="others"> ${item.price} </h6>
              <a className="others" href={`/sellerprofile/${item.owner}`}>
                {" "}
                click{" "}
              </a>
            </div>
          ))}
      </div>
      <article>
        <h4 className="section_name">Remarks</h4>
              <p>{remarks}
              </p>
      </article>
    </div>
  );
};

export default EachTransaction;
