import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MdGppGood,
  MdOutlinePriceChange,
  MdProductionQuantityLimits,
} from "react-icons/md";
import viewUtils from "../../Utils";
import {
  ToggleSecondUpdateForm,
  toggleCreateModal,
} from "../../../Controller/Toggling/toggleCreateModal";
import { useParams } from "react-router-dom";
import { ManualCreateModalToggling } from "../../../Controller/Toggling/toggleCreateModal";
import {
  fetchUpdateProduct,
  productSliceActions,
  secondUpdateProductInfo,
  updateProductInfo,
} from "../../../Model/Local/ProductSlice";
import BarHolder from "../../Components/Navigation/BarHolder";
import hiShopSupabase from "../../../Model/Remote/hiShop";
import { defaultSliceActions } from "../../../Model/Local/DefaultSlice";
// @ts-ignore
function ProductUpdate() {
  const { Input } = viewUtils;
  const [currentForm, setCurrentForm] = useState(1);
  const [fileState, setFileState] = useState(null);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { updateProductMain } = productSliceActions;
  const [currentImage, setCurrentImage] = useState(0);
  const { setIsLoading } = defaultSliceActions;
  const imgUrlFragment: string =
    "https://dhkiodtlpiwxnmsbcepb.supabase.co/storage/v1/object/public/product/";
  // Setting the current form displayed to be  1 initially
  // fetching the product to be updated
  // setting the first image to be the current
  useEffect(() => {
    setCurrentForm(1);
    //   @ts-ignore
    dispatch(fetchUpdateProduct(productId));
    const elems = document.querySelectorAll(".each_img_list");
    elems.forEach((img: any) => {
      img.classList.remove("current_img");
      if (+img.dataset.tab === 0) {
        img.classList.add("current_img");
      }
    });
  }, []);
  const {
    defaultSlice: { isLoading },
    productSlice: { main },
  } = useSelector((state: any) => state);
  const { name, description, price, quantity, productsImageName } = main;
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

  // main functionality
  function productInfosubmitHandler(e: any) {
    e.preventDefault();
    setTimeout(ManualCreateModalToggling, 2000);
    //   @ts-ignore
    dispatch(updateProductInfo());
  }
  function OnchangeHandler(e: any) {
    const { name, value } = e.target;
    // @ts-ignore
    dispatch(updateProductMain({ name, value }));
  }

    
  function fileHandler(e: any) {
    const main = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(main);
    reader.addEventListener("loadend", (e: any) => {
      setFileState(e.target.result);
    });
  }

  async function fileUpload(e: any) {
      e.preventDefault();
    //   @ts-ignore
      dispatch(setIsLoading(true))
    if (fileState !== null) {
      //   @ts-ignore
      dispatch(setIsLoading(false));
      const name = productsImageName[currentImage];
      const { data, error } = await hiShopSupabase.storage
        .from("product")
        .update(name, fileState);
      if (data) {
        //   @ts-ignore
        dispatch(setIsLoading(false));
        //   @ts-ignore
        dispatch(fetchUpdateProduct(productId));
      }
    }
    return;
  }
  // selecting the file to be updated
  function imgClick(e: any) {
    const num: number = +e.target.dataset.tab;
    setCurrentImage(num);
    const elems = document.querySelectorAll(".each_img_list");
    elems.forEach((img: any) => {
      img.classList.remove("current_img");
      if (+img.dataset.tab === num) {
        img.classList.add("current_img");
      }
    });
  }
  // uploading new images
  // for changing the input so that the user can add new img
  const [currentImgInput, setCurrentImgInput] = useState(0);
  const [newFileState, setNewFileState] = useState(null);
  function newFileHandler(e: any) {
    const main = e.target.files[0];
    const { name } = main;
    const reader = new FileReader();
    reader.readAsArrayBuffer(main);
    reader.addEventListener("loadend", (e: any) => {
      // @ts-ignore
      setNewFileState({ file: e.target.result, name });
    });
  }

  async function newFileUpload(e: any) {
    e.preventDefault();
    if (newFileState !== null) {
      //   @ts-ignore
      dispatch(setIsLoading(true));
      const { name, file } = newFileState;
      const { data, error } = await hiShopSupabase.storage
        .from("product")
        .upload(`folder/${name}`, file);

      if (data) {
        //   @ts-ignore
        dispatch(setIsLoading(false));
        const { path } = data;
        const obj = {
          ...main,
          productsImageName: [path, ...main.productsImageName],
          };
          
        //   @ts-ignore
        dispatch(secondUpdateProductInfo(obj));
      }
    }
    return;
  }

  return (
    <section className="product_update_page">
      <section className="product_update_type">
        <BarHolder />
        <div className="product_update_btn_section">
          <button type="button" onClick={() => ManualCreateModalToggling()}>
            update product info
          </button>
          <h5> or</h5>
          <button
            type="button"
            className="second_update_form_btn"
            onClick={ToggleSecondUpdateForm}
          >
            update product images
          </button>
        </div>
      </section>

      {/* first form */}
      <div
        className="product_create_modal hide_product_create_modal"
        onClick={toggleCreateModal}
      >
        {/* main form */}
        <form
          onSubmit={productInfosubmitHandler}
          className="create_product_form"
        >
          <header>
            {isLoading ? <h2>loading ....</h2> : <h2>create a product</h2>}
          </header>
          {/* first section */}
          <section className="first_product_create_section">
            {firstPart.map((item: obj, index: number) => (
              <Input action={OnchangeHandler} key={index} {...item} />
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
                onChange={OnchangeHandler}
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
                  onClick={productInfosubmitHandler}
                >
                  submit
                </button>
              </>
            )}
          </footer>
        </form>
      </div>
      {/* second form */}
      <section
        onClick={ToggleSecondUpdateForm}
        className="second_product_update_form_holder"
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="second_product_update_form"
        >
          {isLoading && <h3>Loading ...</h3>}
          {currentImgInput === 0 && (
            <>
              <div className="product_update_input_holder">
                <label htmlFor="product images">update product image</label>
                <input
                  title="product images"
                  name="productsImageName"
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  onChange={fileHandler}
                />
                <button onClick={fileUpload} type="submit">
                  Update
                </button>
              </div>
              <button
                onClick={() => setCurrentImgInput(1)}
                className="add_new_img_btn"
                type="button"
              >
                Add new Image
              </button>
            </>
          )}
          {currentImgInput === 1 && (
            <>
              <div className="product_update_input_holder">
                <label htmlFor="product images">Add New product image</label>
                <input
                  title="product images"
                  name="productsImageName"
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  onChange={newFileHandler}
                />
                <button onClick={newFileUpload} type="submit">
                  Upload
                </button>
              </div>
              <button
                onClick={() => setCurrentImgInput(0)}
                className="add_new_img_btn"
                type="button"
              >
                update Image
              </button>
            </>
          )}
          {/* btn for switching to adding new image */}

          {/* rendering all the images */}
          <div className="all_image_list">
            {productsImageName.map((item: string, index: number) => {
              const date = new Date().getMilliseconds();
              return (
                <img
                  className="each_img_list"
                  onClick={imgClick}
                  data-tab={index}
                  src={imgUrlFragment + item + `?t=${date}`}
                  key={index}
                  alt="image"
                />
              );
            })}
          </div>
        </form>
      </section>
    </section>
  );
}

export default ProductUpdate;
/*
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

          */
