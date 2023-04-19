import React from "react";
import Dryer from "../../../assets/Static/PNG/Hair Dryer.png";
import Blender from "../../../assets/Static/PNG/Blender.png";
import Iron from "../../../assets/Static/PNG/Iron.png";
import Microwave from "../../../assets/Static/PNG/Microwave.png";
function Second() {
  const trendingObj = [
    {
      name: "Hair Dryer",
      body: "A compact hair dryer, it takes little space in your cabinet and can be taken when you travel as well. The handle of the dryer folds up which makes it compact and takes little space in your travel bag.",
      img: Dryer,
    },
    {
      name: "Blender",
      body: "This ultra-modern blender operates in 2 speed pulse modes and comes with a 1L capacity, food-grade plastic texture, and is drop-resistant. A modern look combined with modern technology makes grinding hassle-free. Stainless steel blades, splash-proof lids, and a facility to add ingredients during mixing ensure preparations are as perfect as yours.",
      img: Blender,
    },
    {
      name: "Microwave",
      body: "The Microwave features a 35 minutes timer which allows you to time your cooking. The Microwave also has a normal glass door which is very durable. The defrost setting allows you to easily defrost your frozen meals. Its 36-liter capacity and allows you to warm several meals at a goal.",
      img: Microwave,
    },
    {
      name: "Iron",
      body: "The surface is quoted with special ante-sticky materials to give adequate protection to your clothes and for easy glide on same thereby giving you pleasant ironing experience. It has automatic temperature regulator which regulates the temperature to prevent you from burning your clothes.",
      img: Iron,
    },
  ];
  return (
    <div className="second_landing_page_component">
      <header>
        <h2>Trending Products</h2>
      </header>
      {trendingObj.map((item, i) => (
        <article key={i * 939} className="trending_products">
          <div className="item_info">
            <h4> {item.name} </h4>
            <p> {item.body} </p>
          </div>
          <img src={item.img} className="trending_products_images" alt={item.name} />
        </article>
      ))}
    </div>
  );
}

export default Second;
