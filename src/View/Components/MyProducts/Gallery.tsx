import React, { useState, useEffect } from "react";

// @ts-ignore
function Gallery({ img }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const allImg = document.querySelectorAll(".each_product_image");
    if (!allImg) return;
      allImg.forEach((item: any) => {
        item.classList.remove("active_img")
      if (+item.dataset.tab === current) {
        item.classList.add("active_img")
      }
    });
  }, [current]);
  const imgUrl: string =
    img.length > 0
      ? `https://dhkiodtlpiwxnmsbcepb.supabase.co/storage/v1/object/public/product/`
      : "";
  function Increase(e: any): void {
    setCurrent((prev) => (prev < img.length - 1 ? prev + 1 : 0));
  }
  function Decrease(e: any): void {
    setCurrent((prev) => (prev !== 0 ? prev - 1 : img.length - 1));
  }
  if (img.length === 0) return <></>;
  return (
    <div className="gallery_component">
      <section className="main_img">
        {img.map((item: string, index: number) => {
          return (
            <img
              key={index}
              className="each_product_image"
              data-tab={index}
              width="100px"
              src={imgUrl + item}
              alt="product image"
            />
          );
        })}
      </section>
      <section className="img_control">
        <button onClick={Decrease} type="button">
          {" "}
          {"<"}{" "}
        </button>
        <button onClick={Increase} type="button">
          {" "}
          {">"}{" "}
        </button>
      </section>
    </div>
  );
}

export default Gallery;
