import React, { useState , useEffect} from "react";
import viewUtils from "../../Utils";
import { useSelector } from "react-redux";
import { toggleCreateModal } from "../../../Controller/Toggling/toggleCreateModal";
import {
  MdGppGood,
  MdOutlinePriceChange,
  MdProductionQuantityLimits,
} from "react-icons/md";
// @ts-ignore
function CreateModal({ createProductSubmitHandler, createProductOnchangeHandler, fileHandler}) {
  const { Input } = viewUtils;
  const [currentForm, setCurrentForm] = useState(1);
  // Setting the current form displayed to be  1 initially
  useEffect(() => {
    setCurrentForm(1)
  },[])
  const {
    defaultSlice: { isLoading },
    productSlice: {
      main: { name, description, price, quantity, productsImageName },
    },
  } = useSelector((state: any) => state);
  type obj = {
    name: string;
    label: string;
    type: string;
    Icon: any;
    value: string | number;
  };
  const firstPart: obj[] = [
    {
      name: "name",
      label: "name",
      value: name,
      type: "text",
      Icon: MdGppGood,
    },
    {
      name: "price",
      label: "price($)",
      value: price,
      type: "number",
      Icon: MdOutlinePriceChange,
    },
    {
      name: "quantity",
      label: "quantity",
      value: quantity,
      type: "number",
      Icon: MdProductionQuantityLimits,
    },
  ];
  function Next() {
    const main = document.querySelector(".second_product_create_section ");
    main?.classList.remove("hide_product_create_form_section");
    const prev = document.querySelector(".first_product_create_section ");
    prev?.classList.add("hide_product_create_form_section");
    setCurrentForm(2);
  }

  function Back() {
    const main = document.querySelector(".first_product_create_section ");
    main?.classList.remove("hide_product_create_form_section");
    const prev = document.querySelector(".second_product_create_section ");
    prev?.classList.add("hide_product_create_form_section");
    setCurrentForm(1);
  }
  return (
    <div
      className="product_create_modal hide_product_create_modal"
      onClick={toggleCreateModal}
    >
      {/* main form */}
      <form
        onSubmit={createProductSubmitHandler}
        className="create_product_form"
      >
        <header>
          {isLoading ? <h2>loading ....</h2> : <h2>create a product</h2>}
        </header>
        {/* first section */}
        <section className="first_product_create_section">
          {firstPart.map((item: obj, index: number) => (
            <Input
              action={createProductOnchangeHandler}
              key={index}
              {...item}
            />
          ))}
        </section>
        {/* second section */}
        <section className="second_product_create_section hide_product_create_form_section">
          <div className="each_input last_create_part">
            <label htmlFor="description">description</label>
            <textarea
              title="description"
              name="description"
              value={description}
              onChange={createProductOnchangeHandler}
            />
          </div>
          <div className="each_input last_create_part">
            <label htmlFor="product images">product images</label>
            <input
              title="product images"
              name="productsImageName"
              type="file"
              multiple
              accept=".jpeg, .jpg, .png"
              onChange={fileHandler}
            />
          </div>
        </section>
        {/* btn holder */}
        <footer className="create_modal_btn_holder">
          {currentForm === 1 && (
            <button type="button" onClick={Next} className="btn">
              next
            </button>
          )}
          {currentForm === 2 && (
            <>
              <button type="button" onClick={Back} className="btn">
                back
              </button>
              <button
                type="button"
                className="btn"
                onClick={
                    createProductSubmitHandler
                }
              >
                submit
              </button>
            </>
          )}
        </footer>
      </form>
    </div>
  );
}

export default CreateModal;
